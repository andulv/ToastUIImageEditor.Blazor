---
type: plan-implementation
description: "Plan 002 - implement clear, grouped, and safe image editor controls"
status: active
created: 2026-08-02T16:34:49+02:00
updated: 2026-08-02T20:08:00+02:00
---
# Plan 002 Implementation — Image Editor UX

## 0. Required Context

- Spec: `plan002-spec.md`
- `plan-task-standards`
- `blazor-expert`
- `blazor-mudblazor-layout`
- `simple-english`
- `.agents/testing-guidelines.md`
- `../plan001-toast-ui-image-editor/data/browser-verification-2026-08-01.md`
- `../plan001-toast-ui-image-editor/data/sample-image-selector-verification-2026-08-02.md`

## 1. Tasks

Allowed task statuses: not-started, in-progress, blocked, implemented, reviewed, completed.

| Status | Task |
|---|---|
| `implemented` | [Task P002-T01: Research the native control API and record the UX mapping](tasks/task002-01-control-api-research.md) |
| `implemented` | [Task P002-T02: Add a small grouped-control interop adapter](tasks/task002-02-grouped-control-interop.md) |
| `implemented` | [Task P002-T03: Build the grouped editor control surface](tasks/task002-03-grouped-control-surface.md) |
| `implemented` | [Task P002-T04: Add focused control-surface tests](tasks/task002-04-control-surface-tests.md) |
| `implemented` | [Task P002-T05: Verify the control surface in a browser](tasks/task002-05-browser-verification.md) |

## 2. Task Parallelism

The first three tasks are serial because the recorded native API mapping defines
the adapter, and the adapter defines the control surface:

```text
T01 (research and mapping) -> T02 (interop adapter) -> T03 (control surface)
```

T04 starts after T03. T05 starts only after T03 and T04 are implemented and
checks the browser-only behavior of controls, confirmation, layout, and native
editor interaction.

## 3. Acceptance Criteria

- [ ] A dated decision record maps every visible control group to a supported
  native operation and explains unavailable or intentionally omitted controls.
- [ ] The wrapper uses a grouped, wrapper-owned control surface. It does not
  alter upstream private toolbar markup.
- [ ] View, History, Image, Draw, and Image Adjustment are separate and named
  groups. Reset is absent from the primary UI.
- [ ] Selected-object deletion is in Draw. Delete All has a clear label and
  requires confirmation before it clears added elements.
- [ ] The control surface is keyboard reachable, has visible accessible names,
  and uses disabled states where no native operation is available.
- [ ] The canvas remains the visual focus at desktop and narrow viewport sizes.
- [ ] Focused tests protect stable wrapper UI and interop contracts without
  claiming browser-native behavior.
- [ ] Browser evidence proves representative controls, Delete All cancellation
  and acceptance, responsive layout, clean console, and no runtime CDN or
  usage-statistics request.
- [ ] The solution builds and its test suite passes.
