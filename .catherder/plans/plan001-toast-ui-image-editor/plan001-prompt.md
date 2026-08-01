---
created: 2026-08-01T14:30:06+02:00
updated: 2026-08-01T14:30:06+02:00
---
# Plan 001 Prompt

## Original prompt

We have existing submodule, WrappedToast, for Blazor component that wraps Toast UI Editor, which we use for markdown viewing and editing.
Now we want to have similar support for Toast UI Image Editor. https://github.com/nhn/tui.image-editor
What we want to achieve:
- Submodule with blazor component and sample application
- When that sample application is tested and confirmed working we will add support for it in CatHerder, similar to how we use the markdown editor

How to get there
1. Create new submodule project, same structure as WrappedToast but with "HelloWorld" component and samplepage, no real logic or dependencies.
2. Then make a plan in this new submodule for:
   - Do web lookup and research, read documentation
   - Create component that wraps toast image editor (simplest possible working functionality at this stage, no need to add complexity to support more features, we will come back to that later
   - - Sample page that uses this component
    - Including unit tests
    - During implemention you / executor will have access to browser for testing sample app self.

## Interpreted prompt

Create a new Git submodule at `https://github.com/andulv/ToastUIImageEditor.Blazor` named `ToastUIImageEditor.Blazor`. Mirror WrappedToast's top-level project organization and tooling, but initially include only a Blazor Razor Class Library with a `HelloWorld` component, a sample page that renders it, and test infrastructure. Do not add TOAST UI Image Editor logic or dependencies to the scaffold.

In the new submodule, create a prompt and ready specification for researching the official TOAST UI Image Editor documentation and implementing the simplest useful Blazor wrapper. The future implementation must include a sample page, valuable unit/component tests, and direct browser verification of the running sample. Save relevant initial research findings with the plan. Do not create the executable implementation or task files yet.
