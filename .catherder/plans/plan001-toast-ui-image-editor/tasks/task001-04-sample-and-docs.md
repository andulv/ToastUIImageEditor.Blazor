---
type: task
description: "Task 001-04 — sample image, sample page, and documentation"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`
- `simple-english`

Also read:
- `plan001-spec.md` (sections 1, 3, 4)
- `.agents/project.instructions.md` (project shape, commands)

## Objective

Replace the scaffold sample with a focused image-editor sample page backed by a
bundled sample image, and document package usage, sample execution, attribution,
and the intentionally small API.

## Scope

**Included**

- Add a bundled sample image as a static web asset (no runtime network
  dependency) and pass its static-web-asset path to the component.
- Rewrite `samples/ToastUIImageEditor.Blazor.SampleHost/Components/Pages/Sample.razor`
  to host the image-editor component with explanatory text describing the
  demonstrated behavior (load, edit via the built-in UI, output/download).
- Remove the scaffold `src/ToastUIImageEditor.Blazor/HelloWorld.razor` and drop
  every stale reference to it (sample page, `_Imports.razor`, nav).
- Update `README.md` (root) and `src/ToastUIImageEditor.Blazor/README.md`: what
  the package is, the pinned upstream version, how to run the sample, the
  intentionally small first API, and third-party attribution pointer.

**Excluded**

- Component implementation changes (T03).
- Tests (T05).
- Full browser verification (T06) — this task only confirms the sample builds
  and starts.

## Steps

1. Add the sample image under the package `wwwroot/` (or sample host `wwwroot/`)
   and resolve its `_content/...` path for the component.
2. Rewrite `Sample.razor` to render the image-editor component with sizing that
  keeps the full UI usable, plus the explanatory text.
3. Delete `HelloWorld.razor` and remove all references to it.
4. Update the README files with usage, sample run steps, attribution, and the
  small API description.
5. Build the solution and start the sample host to confirm it launches without
  error (full browser proof is T06).

## Verification

- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- `dotnet run --project samples/ToastUIImageEditor.Blazor.SampleHost` starts and
  prints a local URL without a startup exception.
- Negative checks for the removed scaffold:
  - `HelloWorld.razor` no longer exists: `test ! -e src/ToastUIImageEditor.Blazor/HelloWorld.razor`.
  - No stale references: `grep -RIn "HelloWorld" src/ samples/ tests/` returns nothing.

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
