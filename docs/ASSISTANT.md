# Connection Assistant

## Capabilities

The Connection Assistant is a durable control surface, not a transient chat box. It supports:

- provider and model discovery;
- readiness and credential indicators;
- new conversations and transcript clearing;
- queued messages;
- queued-message editing and cancellation;
- assistant-response retry;
- local image attachments;
- tool request, completion, failure, and handoff events;
- automated queue draining while the page is open.

Conversation state remains in the local control data directory and survives app restarts.

## Message lifecycle

1. The renderer creates or selects a conversation.
2. A message is validated, persisted, and queued.
3. The assistant worker claims one queued message.
4. The provider can answer directly or request a registered tool.
5. Tool calls pass through policy and schema validation.
6. Tool results return to the provider as structured content.
7. The final assistant message and tool events are persisted.

The loop stops after eight tool rounds to prevent runaway conversations.

## Tool access

The assistant sees the same typed tool catalog as Web Workbench. Current registered families include:

- only-cli public reads, navigation, shortcuts, sessions, and cookie import;
- bounded recruiting pipeline runs;
- local application draft preparation.

Arbitrary shell execution is not a chatbot feature. Tools are registered individually with fixed schemas and policies.

## Images

Accepted images are validated by MIME type and size, then written under a content hash. The transcript stores metadata and a local reference, not an embedded unbounded payload.

Images are not sent to a provider unless that message opts in to image upload. When image sharing is off, the provider receives only a notice that local attachments were withheld.

## Provider configuration

OpenAI-compatible providers must use HTTPS unless they are loopback services. URL credentials are rejected. Remote credentials are read from a validated environment-variable name and never returned through the UI API.

The provider transport limits request duration and response size. Provider errors pass through secret redaction before they are stored or displayed.

## Queue controls

- **Edit** changes only a queued user message.
- **Cancel** prevents a queued message from being claimed.
- **Retry** creates a new queued request linked to the failed or completed assistant turn.
- **Clear transcript** removes messages from the selected conversation after confirmation in the UI.

Tool event history remains content-free and can be used for operational debugging without exposing the transcript.
