import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PageHandle { h: number; name: string; role: string; type?: string; hidden?: boolean; disabled?: boolean; private?: boolean; }
interface PageRead { title?: string; url?: string; text?: string; handles?: PageHandle[]; document_id?: string; needs_handoff?: boolean; remedy?: string; }

export type BrowserRequest = (method: 'GET' | 'POST', route: string, body?: Record<string, unknown>) => Promise<Record<string, unknown>>;
export default function BrowserPanel({request, title = 'Browser'}: {request?: BrowserRequest; title?: string} = {}) {
  const [url, setUrl] = useState('https://apply.careers.microsoft.com/careers?query=Azure');
  const [tier, setTier] = useState('lean');
  const [status, setStatus] = useState<Record<string, unknown>>({});
  const [page, setPage] = useState<PageRead>({});
  const [frame, setFrame] = useState('');
  const [agent, setAgent] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [handle, setHandle] = useState('');
  const [value, setValue] = useState('');
  const call: BrowserRequest = async (method, route, body) => {
    const result = await (request || api.browserRequest)(method, route, body);
    if (result.ok === false) throw new Error(String(result.error || result.remedy || result.refused || 'Browser operation refused'));
    return result;
  };
  const refresh = async () => { const next = await call('GET', '/api/status'); setStatus(next); setAgent(String(next.user_agent || '')); };
  const run = async (task: () => Promise<void>) => {
    setBusy(true); setError('');
    try { await task(); } catch (failure) { setError(failure instanceof Error ? failure.message : 'Browser operation failed'); }
    finally { setBusy(false); }
  };
  useEffect(() => { void refresh().catch(failure => setError(String(failure.message || failure))); }, []);
  const read = async () => { setPage(await call('GET', '/api/read') as PageRead); setHandle(''); setFrame(''); };
  const selected = page.handles?.find(item => String(item.h) === handle);
  const unavailable = !selected || selected.private || selected.hidden || selected.disabled || ['password', 'email', 'tel', 'file'].includes(selected.type || '') || page.needs_handoff;
  return <div className="space-y-5">
    <header className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="text-2xl font-bold text-slate-100">{title}</h1><p className="text-sm text-slate-400">LLM Browser owns this persistent research session.</p></div><span role="status" className="text-sm text-slate-300">{String(status.tier || 'Checking')} {status.running ? 'running' : 'idle'}</span></header>
    {error && <p role="alert" className="rounded-md border border-rose-800 p-3 text-rose-300">{error}</p>}
    <div className="flex flex-wrap items-end gap-3"><label className="text-sm text-slate-300">Tier<select aria-label="Browser tier" value={tier} onChange={event => setTier(event.target.value)} className="ml-2 p-2"><option value="light">Light: public HTML</option><option value="lean">Lean: JavaScript pages</option><option value="full">Full: owned browser window</option></select></label><Button disabled={busy} onClick={() => run(async () => { await call('POST', '/api/start', {tier}); await refresh(); })}>Start tier</Button><Button disabled={busy} variant="outline" onClick={() => run(async () => { await call('POST', '/api/stop', {}); setPage({}); setFrame(''); await refresh(); })}>Stop owned browser</Button><Button disabled={busy} variant="outline" onClick={() => run(refresh)}>Refresh status</Button></div>
    <div className="flex flex-wrap gap-2"><Input aria-label="Page URL" value={url} onChange={event => setUrl(event.target.value)} className="min-w-64 flex-1" /><Button disabled={busy} onClick={() => run(async () => { await call('POST', '/api/navigate', {url}); setPage({}); setFrame(''); await refresh(); })}>Navigate</Button><Button disabled={busy} variant="outline" onClick={() => run(read)}>Read page</Button><Button disabled={busy} variant="outline" onClick={() => run(async () => { const result = await call('GET', '/api/frame'); if (!result.ok) throw new Error(String(result.error || 'Frame unavailable')); setFrame('data:image/png;base64,' + result.image_base64); })}>Show frame</Button></div>
    {page.needs_handoff && <div role="status" className="rounded-md border border-amber-700 p-3 text-sm text-amber-300"><p>{page.remedy || 'Complete this verification or sign-in directly in the owned full browser.'}</p><Button disabled={busy} variant="outline" onClick={() => run(async () => { await call('POST', '/api/swap', {painted:true}); await refresh(); })}>Open full browser for sign-in</Button><p className="mt-2">The window opens minimized. Restore it from the Windows taskbar, then re-read the page here.</p></div>}
    <details className="rounded-md border border-slate-700 p-3"><summary className="cursor-pointer text-sm text-slate-200">Browser compatibility</summary><label className="mt-3 block text-sm text-slate-300">User agent<Input aria-label="Compatibility user agent" value={agent} onChange={event => setAgent(event.target.value)} placeholder="Empty uses the browser default" className="mt-2" /></label><p className="my-2 text-xs text-slate-400">Changes future requests. Site challenges still require owner verification.</p><Button disabled={busy} variant="outline" onClick={() => run(async () => { await call('POST', '/api/settings', {user_agent:agent}); await refresh(); })}>Save user agent</Button></details>
    {page.text && <section className="space-y-3"><h2 className="text-lg font-semibold text-slate-100">{page.title || 'Readable page'}</h2><pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-md border border-slate-800 bg-slate-950 p-4 text-slate-300">{page.text}</pre><div className="flex flex-wrap gap-2"><select aria-label="Page handle" value={handle} onChange={event => setHandle(event.target.value)} className="max-w-full p-2"><option value="">Choose a current page control</option>{page.handles?.slice(0,200).map(item => <option key={item.h} value={item.h}>[{item.h}] {item.role}: {item.name}</option>)}</select><Input aria-label="Control value" value={value} onChange={event => setValue(event.target.value)} disabled={Boolean(unavailable)} className="min-w-48 flex-1" /><Button disabled={busy || Boolean(unavailable)} variant="outline" onClick={() => run(async () => { await call('POST','/api/act',{handle:Number(handle),document_id:page.document_id,action:'set_value',value}); await read(); })}>Set value</Button><Button disabled={busy || Boolean(unavailable)} variant="outline" onClick={() => run(async () => { await call('POST','/api/realclick',{handle:Number(handle),document_id:page.document_id}); await read(); })}>Click control</Button></div><p className="text-xs text-slate-400">Handles belong to the latest read. Private fields and consequential application actions use the owner workflow.</p></section>}
    {frame && <img src={frame} alt="Requested frame from the owned LLM Browser session" className="max-w-full rounded-md border border-slate-700" />}
  </div>;
}
