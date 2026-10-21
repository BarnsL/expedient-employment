import type { Api, SearchArgs, SearchLogPayload } from '@/lib/api';

export interface CrewClient {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, body: unknown): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

const BASE = '/apps/expedient-employment/api';
const pause = () => new Promise(resolve => setTimeout(resolve, 750));

export function createCrewBridge(client: CrewClient): Api {
  const listeners = new Set<(payload: SearchLogPayload) => void>();
  let runId = '';
  const call = <T,>(operation: string, args: unknown[] = []) => client.post<T>(BASE + '/bridge', { operation, args });
  const openReport = async (operation: string) => {
    const windowRef = window.open('about:blank', '_blank', 'noopener,noreferrer');
    const result = await call<{ ok: boolean; html?: string; error?: string }>(operation);
    if (result.ok && result.html) {
      const address = URL.createObjectURL(new Blob([result.html], { type: 'text/html' }));
      if (windowRef) windowRef.location.href = address;
      else window.open(address, '_blank', 'noopener,noreferrer');
      setTimeout(() => URL.revokeObjectURL(address), 60000);
    } else windowRef?.close();
    return result;
  };
  return new Proxy({} as Api, {
    get(_target, operation: string) {
      if (operation === 'onSearchLog') return (callback: (payload: SearchLogPayload) => void) => {
        listeners.add(callback); return () => { listeners.delete(callback); };
      };
      if (operation === 'searchCancel') return () => runId
        ? client.delete<Record<string, unknown>>(BASE + '/runs/' + runId)
        : Promise.reject(new Error('No active search'));
      if (operation === 'browserRequest') return (method: 'GET' | 'POST', route: string, body?: Record<string, unknown>) =>
        client.post<Record<string, unknown>>(BASE + '/browser', { method, route, ...(body ? { body } : {}) });
      if (operation === 'reportOpen' || operation === 'applicationsReportOpen') return () => openReport(operation);
      if (operation === 'searchSpawn') return async (parameters: SearchArgs) => {
        const started = await call<{ run_id: string }>('searchSpawn', [parameters]);
        runId = started.run_id;
        let previous = '';
        try {
          for (;;) {
            const state = await client.get<{ status: string; code: number | null; output: string }>(BASE + '/runs/' + runId);
            if (state.output !== previous) {
              for (const line of state.output.split('\n')) for (const callback of listeners) callback({ line, stream: 'stdout' });
              previous = state.output;
            }
            if (state.status !== 'running') return { code: state.code, output: state.output };
            await pause();
          }
        } finally { runId = ''; }
      };
      return (...args: unknown[]) => call(operation, args);
    },
  });
}
