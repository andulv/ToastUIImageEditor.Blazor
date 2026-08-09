---
type: task
description: "Task 002-01 — research the native control API and record the UX mapping"
status: implemented
created: 2026-08-02T16:34:49+02:00
updated: 2026-08-02T18:24:44+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `ketch`

Also read:
- `plan002-spec.md`
- `../plan001-toast-ui-image-editor/data/asset-strategy-2026-08-01.md`
- `src/ToastUIImageEditor.Blazor/ImageEditor.razor.js`
- Official TOAST UI Image Editor API documentation

## Objective

Identify the supported native operations required by the grouped UI and record
the smallest safe mapping before any control-surface code is changed.

## Scope

**Included**

- Confirm supported APIs for View, History, Image, Draw, Image Adjustment,
  selected-object deletion, and clearing added objects.
- Determine how to show operation availability without depending on upstream
  private toolbar DOM.
- Determine how the wrapper can distinguish added-object deletion from image
  reset or image removal.
- Select and justify an accessible confirmation method for Delete All in the
  interactive sample host.
- Record the group-to-operation mapping, omissions, source URLs, and risks in a
  dated `data/` record.

**Excluded**

- Changing component, JavaScript, CSS, sample, or tests.
- Guessing unsupported native APIs.

## Steps

1. Read official API documentation and the pinned 3.15.3 source or distribution.
2. Inspect the existing wrapper-owned module boundaries.
3. Record the required operation mapping and confirmation decision in `data/`.
4. Identify the smallest interop contract that T02 must expose.

## Verification

- A dated mapping record exists in this plan's `data/` directory.
- Manual check: every planned visible action maps to a confirmed supported API,
  is explicitly omitted, or is marked unavailable with a user-facing reason.
- Manual check: the record states why Delete All cannot clear the base image.

---

# Execution

## Executor Notes
By: @openai-codex 2026-08-02T16:39:00+02:00

Created `data/control-api-mapping-2026-08-02.md`. It maps the grouped UI to pinned, supported methods and deliberately omits Reset. It also records that public direct View APIs are unavailable, so the View group gives native canvas guidance instead of calling private members. Delete All uses `clearObjects()` after native confirmation; the pinned command preserves the base image.

### User-feedback follow-up — 2026-08-02T17:23:05+02:00

Accepted the requested custom rotation and aspect-preserving resize dialogs. The updated mapping confirms that public `rotate(angle)` accepts the wrapper's signed degree argument and that public `getCanvasSize()` can populate a resize dialog and calculate its current aspect ratio. Crop state remains wrapper-owned: Start crop sets it, while Apply or Cancel clears it. No native private state or toolbar DOM is needed.

### User-feedback follow-up — 2026-08-02T18:00:24+02:00

Accepted the practical Draw-options slice: brush color and width; three shape types with fill, stroke, and width; two icon types with color; and text content, color, and size. The updated mapping uses only the already-confirmed public `startDrawingMode`, `addShape`, `addIcon`, and `addText` contracts. History will be a wrapper operation journal with a visible count, so it does not depend on native event delivery.

### User-feedback follow-up — 2026-08-02T18:10:03+02:00

Confirmed the pinned `imageEditor.js` public JSDoc defines `zoom({ x, y, zoomLevel })` and `resetZoom()`, with zoom levels from 1.0 through 5.0. The vendored 3.15.3 declaration omits those methods, so the mapping documents the discrepancy and confines use to the documented public source method. The wrapper will own the displayed level and calculate the zoom centre from public `getCanvasSize()`.

## Executor Verification
By: @openai-codex 2026-08-02T16:39:00+02:00

- Confirmed the mapping record names every requested group action as mapped, omitted, or guidance-only.
- Reviewed the pinned declaration file and source for the mapped APIs, stack queries, and `clearObjects()` background-image behavior.
- Ran the Plan 002 validator, `git diff --check`, and `git diff --cached --check` — all passed. The validator reported 0 errors and 0 warnings.


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
