"""Reuse Crew lifecycle events; never create grants, enable apps or poll."""
import asyncio


async def on_startup(ctx):
    from codex_crew.apps.manager import get_app
    from codex_crew.apps.backend import start_app_backend
    if ctx.name != 'expedient-employment':
        raise RuntimeError('Unexpected app lifecycle identity')
    info = await asyncio.to_thread(get_app, ctx.name)
    if not info or not info.get('enabled'):
        ctx.health.mark_error('App is disabled. Its backend was not started.')
        return
    # This manager applies the host admission and sandbox checks again and
    # reuses an existing process. CLI enablement can now reach the same path.
    backend = await asyncio.to_thread(start_app_backend, ctx.name)
    if backend is None:
        ctx.health.mark_error('Crew did not start the backend. Check this app\'s admission result in Library.')


async def on_shutdown(ctx):
    from codex_crew.apps.backend import stop_app_backend
    if ctx.name != 'expedient-employment':
        raise RuntimeError('Unexpected app lifecycle identity')
    await asyncio.to_thread(stop_app_backend, ctx.name)
