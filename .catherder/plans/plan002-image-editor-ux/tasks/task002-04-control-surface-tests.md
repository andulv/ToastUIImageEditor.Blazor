---
type: task
description: "Task 002-04 — add focused control-surface tests"
status: implemented
created: 2026-08-02T16:34:49+02:00
updated: 2026-08-02T18:13:54+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `blazor-expert`

Also read:
- `.agents/testing-guidelines.md`
- `plan002-spec.md`
- `tasks/task002-03-grouped-control-surface.md`
- `tests/ToastUIImageEditor.Blazor.Tests/`

## Objective

Add only durable tests for wrapper-owned group structure and destructive-action
contracts. Leave browser-native behavior to T05.

## Scope

**Included**

- Add tests for visible group names, Reset absence, and the wrapper-owned
  Delete All confirmation contract where they are stable product behavior.
- Add tests for the stable interop mapping only when they protect a real wrapper
  regression.
- Use loose JavaScript interop or targeted module setups. Do not claim that
  canvas rendering or native commands work in bUnit.

**Excluded**

- Canvas, image, download, native modal, layout, or browser event tests.
- Tests named for this plan or task.

## Steps

1. Identify the durable user-visible contracts from T03.
2. Add the smallest bUnit tests that protect those contracts.
3. Remove any test that asserts incidental markup or browser-only behavior.
4. Run the test project and the solution build.

## Verification

- `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` exits 0.
- `dotnet build ToastUIImageEditor.Blazor.slnx` exits 0.
- Manual check: every test protects a product contract independent of Plan 002.

---

# Execution

## Executor Notes
By: @openai-codex 2026-08-02T16:46:03+02:00

Replaced the obsolete one-div smoke assertion with a durable grouped-control contract. The test checks the five visible group names, the clear Delete All label, and Reset absence. It does not test native canvas behavior, confirmation dialogs, or JavaScript command results.

### User-feedback follow-up — 2026-08-02T17:29:42+02:00

Updated the contract so it does not constrain DOM order now that View and History are visually placed to the right of the canvas. It continues to protect all visible group names, Reset absence, and destructive-action clarity, and adds the default Resize, Custom rotate, and crop-state labels. Browser-only transitions remain T05 coverage.

### User-feedback follow-up — 2026-08-02T18:06:13+02:00

Updated the stable default-surface assertion for the History count badge and Draw tool selectors. Added a focused component test that selects Shape and verifies its practical options. It intentionally does not claim that the native canvas has created a shape; that remains browser coverage.

### User-feedback follow-up — 2026-08-02T18:13:54+02:00

Added the stable View-zoom contract: a visible Zoom level label, Zoom out, Set zoom level, Zoom in, and the initial 100% input value. Native zoom behavior remains browser verification.

## Executor Verification
By: @openai-codex 2026-08-02T16:46:03+02:00

- Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (3 passed, 0 failed).
- Ran `dotnet build ToastUIImageEditor.Blazor.slnx` — passed (0 warnings, 0 errors).
- Ran `git diff --check`, `git diff --cached --check`, and the Plan 002 validator — all passed. The validator reported 0 errors and 0 warnings.
- Reviewed the test against the testing guidelines. It protects stable user-visible wrapper behavior and makes no browser-native claim.
- Follow-up: Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (3 passed, 0 failed). Ran `dotnet build ToastUIImageEditor.Blazor.slnx`, both diff checks, and the Plan 002 validator — all passed; the build had 0 warnings and 0 errors, and the validator reported 0 errors and 0 warnings.
- Follow-up: Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (4 passed, 0 failed).
- Follow-up: Ran `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` — passed (4 passed, 0 failed). Ran `dotnet build ToastUIImageEditor.Blazor.slnx` and both diff checks — all passed; the build had 0 warnings and 0 errors.


## Reviewer Verification
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM

## Review Notes
By: @ YYYY-MM-DDTHH:MM:SS+HH:MM
