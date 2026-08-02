---
type: plan-implementation
description: "Plan 001 - deliver the smallest browser-verified Blazor wrapper for TOAST UI Image Editor"
status: active
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-02T16:05:52+02:00
---
# Plan 001 Implementation — Minimal TOAST UI Image Editor Wrapper

## 0. Required Context

- Spec: `plan001-spec.md`
- `plan-task-standards`
- `blazor-expert`
- `nuget-manager`
- `ketch`
- `.agents/project.instructions.md`, `.agents/catherder.project.instructions.md`
- `data/initial-research-2026-08-01.md`
- Structural reference: the sibling `WrappedToast` submodule (`src/WrappedToast/ToastUIEditor.razor`, `ToastUIEditorCore.cs`, `wwwroot/toastui-loader.js`, `THIRD-PARTY-NOTICES.md`, `tests/WrappedToast.Tests/JsModulePathTests.cs`, `ComponentSmokeTests.cs`). Mirror its loader, module isolation, attribution, and disposal patterns where they fit the image editor.

## 1. Tasks

Allowed task statuses: not-started, in-progress, blocked, implemented, reviewed, completed.

| Status | Task |
|---|---|
| `completed` | [Task P001-T01: Refresh research and decide the asset acquisition strategy](tasks/task001-01-research-and-asset-strategy.md) |
| `not-started` | [Task P001-T02: Vendor version-pinned upstream assets as static web assets](tasks/task001-02-vendor-upstream-assets.md) |
| `not-started` | [Task P001-T03: Implement the Blazor image-editor component and JS interop](tasks/task001-03-image-editor-component.md) |
| `not-started` | [Task P001-T04: Sample image, sample page, and documentation](tasks/task001-04-sample-and-docs.md) |
| `not-started` | [Task P001-T05: Focused unit/component tests](tasks/task001-05-tests.md) |
| `not-started` | [Task P001-T06: Final browser verification and evidence](tasks/task001-06-browser-verification.md) |
| `not-started` | [Task P001-T07: Improve the sample layout and add a runtime image selector](tasks/task001-07-sample-image-selector.md) |

## 2. Task Parallelism

The first half is a strict chain because each step's output is the next step's input:

```text
T01 (research/decision) -> T02 (acquire assets) -> T03 (component)
```

After the component exists, two independent tracks fork:

```text
T03 -> T04 (sample page + docs)   ─┐
T03 -> T05 (tests)                ─┼-> T06 (final browser verification)
```

T04 and T05 may run in parallel; neither edits the other's files. T06 (browser
verification) depends on both: it needs the running sample from T04 and the
passing test suite from T05, then performs the load/edit/output/disposal flow
that only a real browser can prove.

T01's recorded decision (vendored distribution, dependency bundling,
`file-saver` requirement) directly determines what T02 acquires, so T01 must be
accepted before T02 starts. T07 follows T06 because it changes the sample page
and requires a fresh browser check of its layout and image selection.

## 3. Acceptance Criteria

- [ ] T01 produced a dated research/decision record in `data/` that resolves the open risks from `initial-research-2026-08-01.md` (dependency bundling, `file-saver`, required CSS/fonts/icons, static-web-asset path behavior).
- [ ] Upstream TOAST UI Image Editor runtime assets are vendored under `src/ToastUIImageEditor.Blazor/wwwroot/`, pinned to an immutable version (no `latest`, no runtime CDN).
- [ ] A lazy, idempotent JS loader exposes `globalThis.tui.ImageEditor` from the packaged static assets.
- [ ] `usageStatistics: false` is set by default when the editor is constructed.
- [ ] A reusable Blazor component renders the upstream full UI (`includeUI`) with a bundled sample image and bounded sizing, and disposes the native instance plus JS references on disposal.
- [ ] The scaffold `HelloWorld.razor` is removed and no stale references to it remain (sample, imports, nav).
- [ ] The sample host renders the image-editor sample page and documents usage, sample execution, attribution, and the intentionally small API.
- [ ] Focused unit/component tests pass (`dotnet test`) and cover only stable wrapper contracts — not browser-only behavior.
- [ ] `dotnet build ToastUIImageEditor.Blazor.slnx` succeeds with no new warnings beyond a pre-existing baseline.
- [ ] Browser verification recorded in `data/` shows the full UI loading the bundled image, a representative edit, a working output/download path, a clean console (no failed assets, no CDN, no usage-statistics request), and clean disposal.
- [ ] The sample stays within a balanced maximum width and viewport-bounded height, and its selector lists the supported images found in the sample host's owned directory after page load.
