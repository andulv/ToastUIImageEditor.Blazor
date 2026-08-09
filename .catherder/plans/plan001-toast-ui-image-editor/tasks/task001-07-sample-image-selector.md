---
type: task
description: "Task 001-07 — improve the sample layout and add a runtime image selector"
status: implemented
created: 2026-08-02T16:05:52+02:00
updated: 2026-08-02T16:14:50+02:00
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
By: @openai-codex 2026-08-02T16:14:50+02:00

Added three sample-host-owned SVG images and a page-load selector that discovers supported root-level files through the server web-root file provider. The selected URL is an allowlisted, escaped file name, and the `@key` recreates the native editor on selection. The sample now constrains the editor to 1000 pixels and a viewport-bounded height. Browser evidence is in `data/sample-image-selector-verification-2026-08-02.md`.

## Executor Verification
By: @openai-codex 2026-08-02T16:14:50+02:00

- Ran `dotnet build ToastUIImageEditor.Blazor.slnx` — passed (0 warnings, 0 errors).
- Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (3 passed, 0 failed).
- Ran `find samples/ToastUIImageEditor.Blazor.SampleHost/wwwroot/images/samples -maxdepth 1 -type f` — found `landscape.svg`, `portrait.svg`, and `square.svg`.
- In headless Chrome, the selector listed only those three images in alphabetical order. Selected each image and recorded a request for its matching local static URL. The editor measured 1000 by 720 pixels in a 1440-pixel viewport; all native controls remained visible.
- For the negative check, temporarily created `ignored.txt` and `nested/ignored.svg`. A page reload still listed only the three supported root-level files. Removed both temporary files.
- Ran `git diff --check`, `git diff --cached --check`, and the plan validator — all passed. The validator reported 0 errors and 0 warnings.


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
