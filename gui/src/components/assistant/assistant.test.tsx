import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Composer from './Composer';
import MessageQueue from './MessageQueue';
import Transcript from './Transcript';
import type { AssistantAttachment, AssistantEvent, AssistantMessage } from '@/lib/api';

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
