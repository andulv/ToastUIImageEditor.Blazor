---
type: task
description: "Task 001-03 — implement the Blazor image-editor component and JS interop"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`
- `nuget-manager`

Also read:
- `plan001-spec.md` (sections 3, 4, 6, 7)
- `WrappedToast` reference: `src/WrappedToast/ToastUIEditor.razor`,
  `src/WrappedToast/ToastUIEditor.razor.js`, `src/WrappedToast/ToastUIEditorCore.cs`

## Objective

Add the reusable Blazor component that hosts the native TOAST UI Image Editor
with the upstream full UI, and the small collocated JS interop module that owns
the native instance and disposes it cleanly.

## Scope

**Included**

- A Razor component, e.g. `src/ToastUIImageEditor.Blazor/ImageEditor.razor`,
  owning its root element and initializing `tui.ImageEditor` after first render
  via a collocated `ImageEditor.razor.js` module loaded from
  `./_content/ToastUIImageEditor.Blazor/ImageEditor.razor.js`.
- The interop module: call the loader (from T02) to ensure assets, construct the
  editor with `includeUI`, the bundled sample image (resolved as a static-web-asset
  path), bounded `cssMaxWidth`/`cssMaxHeight` and `uiSize`, and
  `usageStatistics: false`. Keep the native instance in a module-owned handle
  keyed by element (mirror WrappedToast's `WeakMap`).
- A minimal public surface for this slice: parameters for sizing and the sample
  image path, plus a safe `DisposeAsync` that calls upstream `destroy()` and
  releases the module and instance references, tolerating `JSDisconnectedException`.
  Surface initialization failure clearly (the JS promise reject path must not be
  swallowed silently).
- Use Blazor JS module isolation; no global host-page script requirement.

**Excluded**

- Mirroring the full upstream API (deferred).
- The sample page content (T04) and tests (T05).
- A .NET export method unless T01's decision or T06's verification proves the
  built-in download path is insufficient.

## Steps

1. Add `ImageEditor.razor` with an element-owning root `<div>` and a
   `JsModulePath` pointing at the static-web-asset URL. If a shared base helps
   (module load, options forwarding, dispose), add it, but keep it minimal.
2. Add `ImageEditor.razor.js` with `initialize(element, options)` and `dispose()`,
   constructing `new tui.ImageEditor(el, options)` with the options above and
   forwarding only what the sample needs.
3. Implement `OnAfterRenderAsync(firstRender)` initialization and
   `DisposeAsync`, mirroring the reference disposal pattern (null out refs first,
   then await `dispose`/`DisposeAsync` in a `try/catch (JSDisconnectedException)`).
4. Build and confirm the component compiles and the module path is correct.

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` exits 0 (existing tests still pass; new tests land in T05).
- Manual check: `ImageEditor.razor.js` constructs the editor with
  `usageStatistics: false` and `includeUI`, and the module path is
  `./_content/ToastUIImageEditor.Blazor/ImageEditor.razor.js`.
- Manual check: `DisposeAsync` calls the native `destroy()`/dispose path and
  tolerates `JSDisconnectedException`.

---

# Execution

## Executor Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Executor Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
