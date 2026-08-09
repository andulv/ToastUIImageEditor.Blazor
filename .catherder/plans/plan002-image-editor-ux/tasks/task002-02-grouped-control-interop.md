---
type: task
description: "Task 002-02 — add a small grouped-control interop adapter"
status: implemented
created: 2026-08-02T16:34:49+02:00
updated: 2026-08-02T20:08:00+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`

Also read:
- `plan002-spec.md`
- `data/control-api-mapping-*.md`
- `src/ToastUIImageEditor.Blazor/ImageEditor.razor`
- `src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`

## Objective

Add the minimal wrapper-owned JavaScript and .NET interop contract required by
the grouped editing surface.

## Scope

**Included**

- Expose only the mapped operations from T01 through the collocated module.
- Keep the native editor instance private to JavaScript.
- Support reporting operation availability required for disabled states.
- Implement selected-object deletion and clear-added-objects semantics exactly as
  recorded by T01.
- Preserve initialization, disposal, local assets, and `usageStatistics: false`.

**Excluded**

- Visual control layout and styling.
- A general native API mirror.
- Browser confirmation presentation.

## Steps

1. Add the mapped module exports and matching internal component calls.
2. Keep the contract narrow and name operations by user intent.
3. Preserve safe behavior before initialization and after disposal.
4. Build the solution and inspect the interop method names and options.

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- Manual check: each export is in T01's mapping; no upstream private toolbar DOM
  selector is used.
- Manual check: clear-added-objects cannot clear the base image.
- `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js` exits 0.

---

# Execution

## Executor Notes
By: @openai-codex 2026-08-02T16:42:25+02:00

Replaced the native full-UI initialization with a canvas-only editor and added a wrapper-owned adapter. The adapter has a constrained operation switch, event-driven state, a small read-only history journal, and a confirmation-protected clear-added-objects operation. It uses only the public methods mapped by T01 and leaves the native instance private to JavaScript.

### User-feedback follow-up — 2026-08-02T17:25:22+02:00

Added the wrapper-owned crop-mode state, public canvas-size query, and validated custom rotation operation. Custom rotation accepts only non-zero whole-number angles from -360 to 360 degrees. The UI supplies the sign from its direction selector; no native UI state is read.

### User-feedback follow-up — 2026-08-02T18:02:45+02:00

Fixed .NET state callbacks to deserialize JavaScript camel-case state case-insensitively. This preserves crop state and history after native canvas events. The adapter now records completed wrapper operations directly, so History is populated regardless of optional native events. Added validated, allow-listed arguments for the practical Draw-options slice; the adapter keeps the native instance private and uses no toolbar DOM or private native members.

### User-feedback follow-up — 2026-08-02T18:11:30+02:00

Added a validated View zoom operation using the pinned source's documented public `ImageEditor.zoom`. It accepts only whole percentages from 10 through 500 and zooms around the centre from public `getCanvasSize()`. View zoom deliberately does not add an image-edit history entry.

## Executor Verification
By: @openai-codex 2026-08-02T16:42:25+02:00

- Ran `dotnet build ToastUIImageEditor.Blazor.slnx` — passed (0 warnings, 0 errors).
- Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (3 passed, 0 failed).
- Ran `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js` — passed.
- Searched the component module for upstream toolbar selectors and private `ui` or `graphics` access — no matches.
- Ran the Plan 002 validator, `git diff --check`, and `git diff --cached --check` — all passed. The validator reported 0 errors and 0 warnings.
- Follow-up: Ran `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`, `dotnet build ToastUIImageEditor.Blazor.slnx`, and both diff checks — all passed. The first build attempt was blocked only by the active `dotnet watch` process holding the PDB; after stopping that process, the same build passed with 0 warnings and 0 errors.
- Follow-up: Ran `node --check src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`, `dotnet build ToastUIImageEditor.Blazor.slnx`, and both diff checks — all passed (0 build warnings/errors).


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
