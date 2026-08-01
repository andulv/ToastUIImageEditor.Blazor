---
type: project
description: "ToastUIImageEditor.Blazor project-specific CatHerder rules"
---
# ToastUIImageEditor.Blazor — CatHerder Project Rules

The CatHerder method for planning, execution, review, persistence, and file
formats is owned by the `plan-task-standards` skill. This file adds only
project-specific rules.

General project guidance is in [project.instructions.md](project.instructions.md).

## Scope boundary

Scope is this project only.

- Treat files outside the project root as read-only by default.
- Do not edit outside the project unless the user explicitly requests it.
- If multiple projects are open, confirm the active project root first.

## Plans

Plans live in `.catherder/plans/`.

## Git workflow

- Create and revise prompt/spec artifacts on `main`.
- Commit plan files before creating an implementation branch or worktree.
- Use a dedicated branch or worktree when plan execution changes files outside `.catherder/plans/`.
- Use one commit per completed task and prefix the subject with the task ID.
- Merges to `main` require explicit supervisor approval.
