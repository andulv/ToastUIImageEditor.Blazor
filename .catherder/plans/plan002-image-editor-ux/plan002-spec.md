---
type: plan-spec
description: "Plan 002 - make the image editor controls clear, grouped, and safe"
status: ready
created: 2026-08-02T16:32:49+02:00
updated: 2026-08-02T16:32:49+02:00
---
# Plan 002 Spec — Image Editor UX

## 0. Required Context

- `plan-task-standards`
- `blazor-expert`
- `blazor-mudblazor-layout`
- `simple-english`
- `AGENTS.md`
- `.agents/project.instructions.md`
- `README.md`
- `../plan001-toast-ui-image-editor/plan001-spec.md`
- `../plan001-toast-ui-image-editor/data/browser-verification-2026-08-01.md`
- Official TOAST UI Image Editor documentation: <https://nhn.github.io/tui.image-editor/latest/>

## 1. Goal

Provide a clear, modern editing surface that makes the first use of the image
editor easy while keeping the image and canvas as the visual focus.

## 2. Context / Why

The current upstream full UI uses two toolbars. Most controls have equal visual
weight. Their groups and effects are not clear to a first-time user. The Reset
control looks destructive, and the relationship between the deletion controls
and the drawing tools is unclear.

The wrapper now proves that the native editor works. The next step is to make
its editing controls understandable without replacing the native canvas engine.

## 3. What We Want To Achieve (Outcomes)

- A grouped editing surface with clear View, History, Image, Draw, and Image
  Adjustment sections.
- View controls for Zoom and Hand that are visibly separate from image-changing
  operations.
- History controls for viewing history, Undo, and Redo. Reset is absent from the
  primary UI.
- Image controls for Resize, Crop, Flip, and Rotate.
- Draw controls for Draw, Shape, Icon, and Text. The selected-object delete
  action is in this group.
- Image Adjustment controls for Mask and Filter.
- A separate Delete All action for added elements. It must ask for confirmation
  before it changes the image state.
- Labels, icons, disabled states, tooltips, keyboard behavior, and focus order
  that make each group and destructive action clear.
- A responsive layout that preserves image focus on common desktop and narrow
  browser widths.
- Browser evidence that verifies grouped controls, image editing, deletion
  confirmation, and the absence of Reset from the primary UI.

## 4. Key Principles / Constraints

- Keep TOAST UI Image Editor as the canvas and image-processing engine.
- Replace the confusing native control presentation rather than rearranging its
  private DOM structure.
- Keep the public .NET API small. Do not mirror the full native API.
- Preserve native keyboard and canvas interactions where they remain useful.
- Destructive actions must have clear labels. Delete All must require a user
  confirmation; selected-object deletion must act only on a selected added
  element.
- Do not make the controls compete visually with the image canvas.
- Use concise, plain UI text. Do not use vague icon-only destructive controls.
- Keep the sample application independent of the parent CatHerder application.

## 5. Out of Scope

- A general C# wrapper for every TOAST UI method, option, event, filter, or
  object model.
- Server-side image processing, storage, upload, authentication, or sharing.
- A full mobile-specific editor redesign.
- Changing the vendored upstream image-processing implementation.
- Restoring Reset to the primary UI.

## 6. Implementation Notes

Build a wrapper-owned control surface around the native editor instead of
modifying upstream private markup. The surface can call a deliberately small
set of JavaScript interop operations that map to the grouped user actions.
Hide or disable the corresponding native controls so a user sees one clear
editing model.

Use visible group labels and compact visual separation. Show labels with icons
for operations that are unclear by icon alone. Use a native browser confirmation
or a wrapper dialog for Delete All. The implementation must record why the
chosen confirmation method is accessible and reliable in the supported sample
host.

Research the native API and UI behavior before choosing the exact interop
methods. Browser verification must include selecting an object, deleting it,
cancelling and accepting Delete All, applying an image operation, and checking
narrow-width layout.

## 7. Open Questions

1. Should the wrapper retain and restyle the native two-toolbar DOM? (resolved:
   no; use a wrapper-owned control surface to avoid dependence on upstream
   private DOM structure.)
2. Should Reset remain available in the primary editing surface? (resolved: no;
   remove it from the primary UI.)
3. How must Delete All behave? (resolved: it removes added elements only and
   requires an explicit user confirmation.)
4. Must a new public .NET API expose every control? (resolved: no; keep the
   public API small and keep grouped interaction details in the wrapper.)
