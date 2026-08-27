import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  KeyRound,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import Composer from '@/components/assistant/Composer';
import MessageQueue from '@/components/assistant/MessageQueue';
import Transcript from '@/components/assistant/Transcript';
import { api } from '@/lib/api';
import type {
  AssistantAttachment,
  AssistantEvent,
  AssistantMessage,
  ConversationRecord,
  ProviderReadiness,
} from '@/lib/api';

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error(`Could not read ${file.name}.`));
    reader.onload = () => {
      const value = String(reader.result || '');
      resolve(value.includes(',') ? value.split(',', 2)[1] : value);
    };
    reader.readAsDataURL(file);
  });
}

export default function Assistant() {
  const [providers, setProviders] = useState<ProviderReadiness[]>([]);
  const [provider, setProvider] = useState('FreeChain');
  const [models, setModels] = useState<string[]>(['auto']);
  const [model, setModel] = useState('auto');
  const [conversation, setConversation] = useState<ConversationRecord | null>(null);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [events, setEvents] = useState<AssistantEvent[]>([]);
  const [attachments, setAttachments] = useState<AssistantAttachment[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareImages, setShareImages] = useState(false);

  const readiness = useMemo(
    () => providers.find((item) => item.name === provider),
    [provider, providers],
  );
  const conversationId = conversation?.id;

  const refreshTranscript = useCallback(async (id?: string) => {
    const target = id || conversation?.id;
    if (!target) return;
    const [nextMessages, nextEvents] = await Promise.all([
      api.assistantMessages(target),
      api.assistantEvents(target),
    ]);
    setMessages(nextMessages);
    setEvents(nextEvents);
  }, [conversation?.id]);

  const loadModels = async (name: string) => {
    try {
      const next = await api.assistantModels(name);
      const values = next.length ? next : ['auto'];
      setModels(values);
      setModel(values[0]);
    } catch (reason) {
      setModels(['auto']);
      setModel('auto');
      setError(reason instanceof Error ? reason.message : 'Model refresh failed.');
    }
  };

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const [nextProviders, conversations] = await Promise.all([
          api.assistantProviders(),
          api.assistantConversations(),
        ]);
        if (!active) return;
        setProviders(nextProviders);
        const nextProvider = nextProviders.find((item) => item.ready)?.name
          || nextProviders[0]?.name
          || 'FreeChain';
        setProvider(nextProvider);
        let nextModels: string[] = [];
        try {
          nextModels = await api.assistantModels(nextProvider);
        } catch {
          nextModels = ['auto'];
        }
        if (!active) return;
        setModels(nextModels.length ? nextModels : ['auto']);
        setModel(nextModels[0] || 'auto');
        let current = conversations[0];
        if (!current) {
          current = await api.assistantCreate({
            provider: nextProvider,
            model: nextModels[0] || 'auto',
            title: 'Job hunting control',
          });
        }
        if (!active) return;
        setConversation(current);
        setProvider(current.provider);
        setModel(current.model);
        setShareImages(current.allow_image_upload);
        const [nextMessages, nextEvents] = await Promise.all([
          api.assistantMessages(current.id),
          api.assistantEvents(current.id),
        ]);
        if (!active) return;
        setMessages(nextMessages);
        setEvents(nextEvents);
      } catch (reason) {
        if (active) setError(reason instanceof Error ? reason.message : 'Assistant could not start.');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!conversationId) return undefined;
    const interval = window.setInterval(() => {
      void refreshTranscript(conversationId).catch(() => {});
    }, 2000);
    return () => window.clearInterval(interval);
  }, [conversationId, refreshTranscript]);

  const newConversation = async () => {
    setBusy(true);
    setError('');
    try {
      const next = await api.assistantCreate({
        provider,
        model,
        title: 'Job hunting control',
        allow_image_upload: shareImages,
      });
      setConversation(next);
      setMessages([]);
      setEvents([]);
      setAttachments([]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Conversation could not be created.');
    } finally {
      setBusy(false);
    }
  };

  const drainQueue = async (conversationId: string) => {
    setBusy(true);
    try {
      for (let count = 0; count < 50; count += 1) {
        const queue = await api.assistantQueue(conversationId);
        if (queue.length === 0) break;
        await api.assistantRun(conversationId);
        await refreshTranscript(conversationId);
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The assistant queue stopped.');
    } finally {
      setBusy(false);
      await refreshTranscript(conversationId).catch(() => {});
    }
  };

  const send = async (content: string) => {
    if (!conversation) throw new Error('Create a conversation first.');
    setError('');
    await api.assistantSend(conversation.id, {
      content,
      attachment_ids: attachments.map((item) => item.id),
    });
    setAttachments([]);
    await refreshTranscript(conversation.id);
    void drainQueue(conversation.id);
  };

  const attach = async (files: FileList) => {
    if (!conversation) return;
    setError('');
    try {
      const remaining = Math.max(0, 5 - attachments.length);
      const selected = Array.from(files).slice(0, remaining);
      const uploaded: AssistantAttachment[] = [];
      for (const file of selected) {
        uploaded.push(await api.assistantAttach(conversation.id, {
          filename: file.name,
          mime_type: file.type,
          data_base64: await fileToBase64(file),
        }));
      }
      setAttachments((current) => [...current, ...uploaded]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Image attachment failed.');
    }
  };

  const edit = async (message: AssistantMessage) => {
    const content = window.prompt('Edit queued message', message.content);
    if (!content || content.trim() === message.content) return;
    await api.assistantEdit(message.id, content);
    await refreshTranscript(message.conversation_id);
  };

  const cancel = async (message: AssistantMessage) => {
    await api.assistantCancel(message.id);
    await refreshTranscript(message.conversation_id);
  };

  const retry = async (message: AssistantMessage) => {
    const next = await api.assistantRetry(message.id);
    await refreshTranscript(message.conversation_id);
    void drainQueue(next.conversation_id);
  };

  const clear = async () => {
    if (!conversation || !window.confirm('Clear this local transcript and its image attachments?')) return;
    await api.assistantClear(conversation.id);
    setMessages([]);
    setEvents([]);
    setAttachments([]);
  };

  return (
    <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1600px] flex-col gap-5">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-50">Connection assistant</h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Queue requests, add image context, run only-cli and pipeline tools, and keep external actions behind exact approval.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => void clear()}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-700 px-3 text-xs text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear transcript
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void newConversation()}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-cyan-300 px-3 text-xs font-semibold text-cyan-950 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-100 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
            New conversation
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
        <div className="grid gap-3 border-b border-slate-800 p-4 md:grid-cols-[minmax(180px,1fr)_minmax(180px,1fr)_auto]">
          <label className="text-[11px] font-semibold text-slate-500">
            Provider
            <select
              value={provider}
              onChange={(event) => {
                setProvider(event.target.value);
                void loadModels(event.target.value);
              }}
              className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {providers.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
          </label>
          <label className="text-[11px] font-semibold text-slate-500">
            Model
            <select
              value={model}
              onChange={(event) => setModel(event.target.value)}
              className="mt-2 h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {models.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => void loadModels(provider)}
            aria-label="Refresh provider models"
            className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 px-4 py-3">
          <span className={`rounded-full border px-2 py-1 text-[10px] font-medium ${
            readiness?.ready
              ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
              : 'border-amber-800 bg-amber-950/35 text-amber-300'
          }`}>
            {readiness?.ready ? 'Provider ready' : 'Provider needs attention'}
          </span>
          <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
            {models.length} model{models.length === 1 ? '' : 's'}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-400">
            <KeyRound className="h-3 w-3" />
            Credentials remain outside transcript storage
          </span>
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-[10px] text-slate-500">
            <input
              type="checkbox"
              checked={shareImages}
              onChange={(event) => setShareImages(event.target.checked)}
              className="h-3.5 w-3.5 accent-cyan-300"
            />
            Share images with provider on new conversations
          </label>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3 text-xs text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
          {conversation ? `Ready in ${conversation.title}` : 'Connecting to the local control service'}
        </div>

        {error && (
          <div role="alert" className="border-b border-rose-900 bg-rose-950/35 px-4 py-3 text-sm text-rose-200">
            {error} Check provider readiness or start a new conversation after correcting the configuration.
          </div>
        )}

        <div className="grid min-h-[460px] lg:grid-cols-[minmax(0,1fr)_288px]">
          <div className="flex min-w-0 flex-col">
            <div className="min-h-0 flex-1 overflow-auto">
              <Transcript messages={messages} events={events} loading={loading || busy} />
            </div>
            <Composer
              attachments={attachments}
              disabled={!conversation || loading}
              onAttach={(files) => void attach(files)}
              onRemoveAttachment={(id) => setAttachments((items) => items.filter((item) => item.id !== id))}
              onSend={send}
            />
          </div>
          <MessageQueue messages={messages} onEdit={edit} onCancel={cancel} onRetry={retry} />
        </div>
      </div>
    </section>
  );
}
