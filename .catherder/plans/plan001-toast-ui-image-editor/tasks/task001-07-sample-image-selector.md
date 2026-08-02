---
type: task
description: "Task 001-07 — improve the sample layout and add a runtime image selector"
status: not-started
created: 2026-08-02T16:05:52+02:00
updated: 2026-08-02T16:05:52+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`
- `simple-english`

Also read:
- `plan001-spec.md` (sections 3, 4, and 6)
- `.agents/project.instructions.md`
- `data/browser-verification-2026-08-01.md`

## Objective

Make the sample editor layout balanced and let an operator select any supported
image that is present in a sample-application-owned directory when the page
loads.

## Scope

**Included**

- Add `samples/ToastUIImageEditor.Blazor.SampleHost/wwwroot/images/samples/`
  with three self-contained, suitable test images of different shapes: landscape,
  portrait, and square. Do not use runtime network assets.
- At page load, enumerate only supported image files in that directory through
  the sample host's server-side web-root file provider. Construct a selector
  from the discovered file names, sorted deterministically.
- Support `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, and `.svg` files. Do not
  recurse into child directories. Construct static URLs only from the discovered
  file names; do not accept or expose a client-supplied filesystem path.
- Refreshing the page after an operator adds a supported file to that directory
  must list the new file without a source-code change.
- Recreate the editor when the selection changes so that the selected image is
  the image loaded by the native editor.
- Constrain the editor to a balanced maximum width, center it in the sample
  content, and use a viewport-bounded height that leaves room for the full UI.
- Update the sample text to tell operators where to add images and that a page
  refresh discovers them.

**Excluded**

- Recursive galleries, upload, file-system browsing from the client, or image
  management features.
- Changes to the reusable component's public API.
- Changes to the vendored TOAST UI assets.

## Steps

1. Add three local sample images to the sample-host-owned image directory.
2. Add a page-load-only, allowlisted image discovery method to `Sample.razor`.
3. Add the selector and recreate the editor for the selected static image URL.
4. Add sample-page styling that limits the editor width and height without
   clipping the native controls.
5. Update the explanatory page text.
6. Build, run, and inspect the sample in a browser after selecting each image.

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` exits 0.
- `find samples/ToastUIImageEditor.Blazor.SampleHost/wwwroot/images/samples -maxdepth 1 -type f` lists at least three supported images.
- Manual browser check: the selector lists each supported root-level image after
  page load; selecting each option reloads that image in the full UI; the editor
  does not occupy the entire page width; and native controls remain visible.
- Negative check: a nested image and an unsupported extension do not appear in
  the selector.

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
