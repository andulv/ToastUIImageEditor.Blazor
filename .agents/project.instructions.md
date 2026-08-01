---
type: project
description: "ToastUIImageEditor.Blazor project-specific instructions"
alwaysApply: true
---
# Project Instructions — ToastUIImageEditor.Blazor

ToastUIImageEditor.Blazor is a standalone Blazor Razor Class Library intended
to provide a thin wrapper around TOAST UI Image Editor.

Read first:

- [catherder.project.instructions.md](catherder.project.instructions.md)
- [../README.md](../README.md)

## Project shape

- `src/ToastUIImageEditor.Blazor` — reusable Razor class library.
- `samples/ToastUIImageEditor.Blazor.SampleHost` — Blazor sample application.
- `tests/ToastUIImageEditor.Blazor.Tests` — unit and component tests.
- `.catherder/plans` — CatHerder plan artifacts.

## Implementation guidelines

- Keep the reusable component independent of CatHerder and host-specific workflows.
- Research official TOAST UI Image Editor documentation and source before changing native behavior.
- Keep JavaScript interop modules small and named by responsibility.
- Prefer bundled, version-pinned static web assets over a runtime CDN dependency.
- Disable upstream usage statistics by default unless a host explicitly opts in.
- Dispose JavaScript resources and editor instances when the Blazor component is disposed.
- Use browser testing for behavior that depends on canvas, JavaScript, layout, or native editor assets.
- Add project tests only for stable product behavior. Do not add tests whose only purpose is to prove a plan task was completed.

## Commands

From this repository root:

- Restore: `dotnet restore ToastUIImageEditor.Blazor.slnx`
- Build: `dotnet build ToastUIImageEditor.Blazor.slnx`
- Test: `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj`
- Run sample: `dotnet run --project samples/ToastUIImageEditor.Blazor.SampleHost`
