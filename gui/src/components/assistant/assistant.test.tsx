import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Composer from './Composer';
import MessageQueue from './MessageQueue';
import Transcript from './Transcript';
import Assistant from '@/pages/Assistant';
import type {
  AssistantAttachment,
  AssistantEvent,
  AssistantMessage,
  ConversationRecord,
} from '@/lib/api';

const message = (values: Partial<AssistantMessage> = {}): AssistantMessage => ({
  id: 'message-1',
  conversation_id: 'conversation-1',
  role: 'user',
  content: 'Inspect the recruiting page',
  status: 'queued',
  sequence: 1,
  retry_of: '',
  created_at: '2026-08-25T00:00:00Z',
  updated_at: '2026-08-25T00:00:00Z',
  ...values,
});

const attachment: AssistantAttachment = {
  id: 'attachment-1',
  conversation_id: 'conversation-1',
  filename: 'context.png',
  mime_type: 'image/png',
  byte_count: 20,
  digest: 'digest',
  created_at: '2026-08-25T00:00:00Z',
};

const conversation: ConversationRecord = {
  id: 'conversation-1',
  title: 'Existing conversation',
  provider: 'FreeChain',
  model: 'freechain/auto',
  allow_image_upload: false,
  created_at: '2026-08-25T00:00:00Z',
  updated_at: '2026-08-25T00:00:00Z',
};

const unavailableProvider = {
  name: 'FreeChain',
  ready: false,
  credential_configured: false,
  reachable: false,
  authenticated: false,
  model_count: 0,
  detail: 'Provider credential is not configured',
};

const readyProvider = {
  name: 'FreeChain',
  ready: true,
  credential_configured: true,
  reachable: true,
  authenticated: true,
  model_count: 1,
  detail: 'Provider ready',
};

type DesktopApiDouble = Record<string, ReturnType<typeof vi.fn>>;

function installDesktopApi(overrides: Partial<DesktopApiDouble> = {}) {
  const desktopApi: DesktopApiDouble = {
    providerCredentialStatus: vi.fn().mockResolvedValue({
      configured: false,
      saved: false,
      source: 'none',
    }),
    providerCredentialReimport: vi.fn().mockResolvedValue({
      configured: false,
      saved: false,
      source: 'none',
    }),
    providerCredentialClear: vi.fn().mockResolvedValue({
      configured: false,
      saved: false,
      source: 'none',
    }),
    assistantProviders: vi.fn().mockResolvedValue([unavailableProvider]),
    assistantModels: vi.fn().mockResolvedValue([]),
    assistantConversations: vi.fn().mockResolvedValue([]),
    assistantCreate: vi.fn().mockResolvedValue(conversation),
    assistantMessages: vi.fn().mockResolvedValue([]),
    assistantEvents: vi.fn().mockResolvedValue([]),
    ...overrides,
  };
  window.api = desktopApi as unknown as NonNullable<Window['api']>;
  return desktopApi;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  delete window.api;
});

describe('assistant interaction components', () => {
  it('sends on Enter and preserves Shift+Enter for a newline', async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    render(
      <Composer
        attachments={[]}
        onAttach={vi.fn()}
        onRemoveAttachment={vi.fn()}
        onSend={send}
      />,
    );
    const textbox = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(textbox, { target: { value: 'first request' } });
    fireEvent.keyDown(textbox, { key: 'Enter', shiftKey: true });
    expect(send).not.toHaveBeenCalled();
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(send).toHaveBeenCalledWith('first request');
  });

  it('shows attached image context and removes it by accessible name', () => {
    const remove = vi.fn();
    render(
      <Composer
        attachments={[attachment]}
        onAttach={vi.fn()}
        onRemoveAttachment={remove}
        onSend={vi.fn()}
      />,
    );
    expect(screen.getByText('context.png')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Remove context.png' }));
    expect(remove).toHaveBeenCalledWith('attachment-1');
  });

  it('exposes edit, cancel, and retry controls for durable queue states', () => {
    const edit = vi.fn();
    const cancel = vi.fn();
    const retry = vi.fn();
    render(
      <MessageQueue
        messages={[message(), message({ id: 'message-2', status: 'failed', sequence: 2 })]}
        onEdit={edit}
        onCancel={cancel}
        onRetry={retry}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Edit queued message' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel queued message' }));
    fireEvent.click(screen.getByRole('button', { name: 'Retry failed' }));
    expect(edit).toHaveBeenCalledTimes(1);
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it('renders approval-required tool events distinctly from transcript content', () => {
    const event: AssistantEvent = {
      id: 1,
      message_id: 'message-1',
      event_type: 'approval_required',
      payload: { tool_name: 'jobs.submit' },
      created_at: '2026-08-25T00:00:00Z',
    };
    render(
      <Transcript
        messages={[message({ status: 'awaiting_approval' })]}
        events={[event]}
        loading={false}
      />,
    );
    expect(screen.getByText('jobs.submit')).toBeVisible();
    expect(screen.getByText('approval required')).toBeVisible();
  });
});

describe('assistant provider readiness and credential controls', () => {
  it('keeps an existing conversation but disables model-dependent actions when the provider is unavailable', async () => {
    installDesktopApi({
      assistantConversations: vi.fn().mockResolvedValue([conversation]),
    });

    render(<Assistant />);

    expect(await screen.findByText('Provider needs attention')).toBeVisible();
    expect(screen.getByText('No verified models')).toBeVisible();
    expect(screen.queryByText(/^\d+ models?$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New conversation' })).toBeDisabled();
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Add to queue' })).toBeDisabled();
    expect(screen.getByText(/re-import a local key, then refresh provider readiness/i)).toBeVisible();
    expect(screen.getByText(/not saved for the current Windows user/i)).toBeVisible();
    expect(document.body.textContent).not.toMatch(/ciphertext|file path/i);
  });

  it('re-imports a local key and refreshes saved status, readiness, and real models', async () => {
    installDesktopApi({
      providerCredentialStatus: vi.fn()
        .mockResolvedValueOnce({ configured: false, saved: false, source: 'none' })
        .mockResolvedValue({ configured: true, saved: true, source: 'encrypted-store' }),
      providerCredentialReimport: vi.fn().mockResolvedValue({
        configured: true,
        saved: true,
        source: 'encrypted-store',
      }),
      assistantProviders: vi.fn()
        .mockResolvedValueOnce([unavailableProvider])
        .mockResolvedValue([readyProvider]),
      assistantModels: vi.fn().mockResolvedValue(['freechain/auto']),
    });

    render(<Assistant />);
    expect(await screen.findByText('Provider needs attention')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Re-import local key' }));

    expect(await screen.findByText('Provider ready')).toBeVisible();
    expect(screen.getByText('1 model')).toBeVisible();
    expect(screen.getByText(/encrypted and saved for the current Windows user/i)).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(/local key re-imported/i);
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeEnabled();
  });

  it('requires confirmation before clearing, exposes loading state, and moves the provider to not ready', async () => {
    let resolveClear: (value: { configured: boolean; saved: boolean; source: string }) => void = () => {};
    const clearPromise = new Promise<{ configured: boolean; saved: boolean; source: string }>((resolve) => {
      resolveClear = resolve;
    });
    installDesktopApi({
      providerCredentialStatus: vi.fn()
        .mockResolvedValueOnce({ configured: true, saved: true, source: 'encrypted-store' })
        .mockResolvedValue({ configured: false, saved: false, source: 'none' }),
      providerCredentialClear: vi.fn().mockReturnValue(clearPromise),
      assistantProviders: vi.fn()
        .mockResolvedValueOnce([readyProvider])
        .mockResolvedValue([unavailableProvider]),
      assistantModels: vi.fn().mockResolvedValue(['freechain/auto']),
      assistantConversations: vi.fn().mockResolvedValue([conversation]),
    });
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);

    render(<Assistant />);
    expect(await screen.findByText('Provider ready')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Clear saved key' }));
    await waitFor(() => expect(screen.getByText('Provider ready')).toBeVisible());
    fireEvent.click(screen.getByRole('button', { name: 'Clear saved key' }));

    expect(screen.getByRole('button', { name: 'Clearing saved key' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Re-import local key' })).toBeDisabled();
    resolveClear({ configured: false, saved: false, source: 'none' });

    expect(await screen.findByText('Provider needs attention')).toBeVisible();
    expect(screen.getByText('No verified models')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(/saved key cleared/i);
    expect(screen.getByRole('button', { name: 'New conversation' })).toBeDisabled();
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled();
  });

  it('shows a safe recoverable error when a credential mutation fails', async () => {
    installDesktopApi({
      providerCredentialReimport: vi.fn().mockRejectedValue(new Error()),
    });

    render(<Assistant />);
    expect(await screen.findByText('Provider needs attention')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Re-import local key' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'The local key could not be re-imported. Try again or refresh provider readiness.',
    );
    expect(screen.getByRole('button', { name: 'Re-import local key' })).toBeEnabled();
  });
});
