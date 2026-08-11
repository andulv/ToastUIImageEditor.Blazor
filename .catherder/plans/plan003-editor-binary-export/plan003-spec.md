---
type: plan-spec
description: "Plan 003 - export the edited image to .NET as a binary stream"
status: ready
created: 2026-08-12T02:20:00+02:00
updated: 2026-08-12T02:20:00+02:00
---
# Plan 003 Spec — Editor binary export

## 0. Required Context
- `plan003-prompt.md`
- `../plan001-toast-ui-image-editor/plan001-spec.md`
- `../../src/ToastUIImageEditor.Blazor/ImageEditor.razor(.js)`
- `../../tests/ToastUIImageEditor.Blazor.Tests/ImageEditorTests.cs`

## 1. Goal
Let .NET read the edited canvas as a bounded binary stream (PNG by default),
without a base64/data-URL string crossing the interop boundary.

## 2. Context / Why
The parent Image Studio must save local edits. `instance.toDataURL({format,
quality})` returns a data-URL string; returning that string to .NET would base64-
expand bytes by ~33% and force a large SignalR message. Returning a `Blob`
instead lets Blazor receive an `IJSStreamReference` and stream bytes directly.

## 3. What We Want To Achieve (Outcomes)
- JS `exportImage(element, { format, quality })` returns a `Blob`.
- .NET `ImageEditor.ExportAsync(format?, quality?, ct)` returns a `Stream` via
  `IJSStreamReference.OpenReadStreamAsync(maxAllowedSize, ct)`.
- A `MaxExportBytes` parameter bounds the read (generous default; caller enforces
  app policy).
- Existing operations, UI, and tests unchanged; one new round-trip test added.

## 4. Key Principles / Constraints
- Binary stream, not base64. PNG default.
- No new dependency. No change to existing operations or UI.
- Verified against tui.image-editor 3.15.3 `toDataURL(options): string`.

## 5. Out of Scope
- Format conversion beyond what `toDataURL` supports (png/jpeg/webp).
- Streaming partial/progressive exports.
- Any UI affordance for export (the caller drives it).

## 6. Implementation Notes
JS converts the data URL to a Blob via `fetch(dataUrl).then(r => r.blob())`.

## 7. Open Questions
1. Default format? (resolved: png.)
