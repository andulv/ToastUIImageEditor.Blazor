---
type: task
description: "Task 003-01 — exportImage JS + ExportAsync .NET + test"
status: completed
created: 2026-08-12T02:20:00+02:00
updated: 2026-08-12T02:30:00+02:00
---
## Required Context
- `plan003-spec.md`
- `src/ToastUIImageEditor.Blazor/ImageEditor.razor(.js)`
- `tests/ToastUIImageEditor.Blazor.Tests/ImageEditorTests.cs`

## Objective
Return the edited canvas to .NET as a bounded binary stream.

## Scope
Included: JS `exportImage` returning a `Blob`; .NET `ExportAsync` returning a
`Stream` via `IJSStreamReference`; `MaxExportBytes` parameter; one round-trip
test. Excluded: UI changes, non-png/jpeg/webp conversion, progress.

## Steps
1. Add `exportImage(element, options)` to `ImageEditor.razor.js`.
2. Add `ExportAsync` + `MaxExportBytes` to `ImageEditor.razor`.
3. Add a Strict-mode round-trip test.
4. Build + test.

## Verification
- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` passes.

---

# Execution

## Executor Notes
By: pi @ 2026-08-12T02:30:00+02:00
- Added `exportImage` (toDataURL → fetch → Blob) and `ExportAsync`
  (InvokeAsync<IJSStreamReference> → OpenReadStreamAsync(MaxExportBytes, ct)).
- Added `MaxExportBytes` parameter (default 50 MB; caller enforces app policy).
- Added Strict-mode round-trip test with a fake IJSStreamReference.
- Verified tui 3.15.3 `toDataURL({format,quality}): string`.

## Executor Verification
By: pi @ 2026-08-12T02:30:00+02:00
- submodule build + tests pass (see parent task168-02 record).

## Reviewer Verification
By: @

## Review Notes
By: @
