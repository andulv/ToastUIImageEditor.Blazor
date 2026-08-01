---
type: task
description: "Task 001-05 — focused unit/component tests"
status: not-started
created: 2026-08-01T15:07:12+02:00
updated: 2026-08-01T15:07:12+02:00
---
## Required Context
Load and follow these skills:
- `plan-task-standards`
- `nuget-manager`

Also read:
- `plan001-spec.md` (sections 3, 4)
- `.agents/project.instructions.md` ("Add project tests only for stable product behavior.")
- `WrappedToast` reference: `tests/WrappedToast.Tests/JsModulePathTests.cs`,
  `tests/WrappedToast.Tests/ComponentSmokeTests.cs`,
  `tests/WrappedToast.Tests/WrappedToast.Tests.csproj`

## Objective

Add a small, durable test set that protects stable wrapper contracts and
non-obvious interop details — without claiming to prove browser-only behavior.

## Scope

**Included**

- Add `bunit` to `tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj`
  (currently xunit only) via the `nuget-manager` skill (dotnet CLI, no manual
  `.csproj` edits).
- A module-path test asserting `ImageEditor.JsModulePath` equals
  `./_content/ToastUIImageEditor.Blazor/ImageEditor.razor.js` (stable contract:
  consumers must not need to re-route the module).
- A bUnit smoke test asserting the component renders its root element (e.g. with
  `InitialStyle` applied), under loose JS-interop mode.
- A test asserting the constructor options forwarded to JS include
  `usageStatistics: false` (privacy contract), if those options are exposed on
  the component in a way a test can read.

**Excluded**

- Tests for canvas rendering, native editor behavior, asset loading, or download
  — those are browser-verified in T06 and must not be claimed by unit tests.
- Tests whose only purpose is to prove a plan task was done.

## Steps

1. Add the `bunit` package reference using the dotnet CLI per `nuget-manager`.
2. Add the module-path test (mirror `JsModulePathTests`).
3. Add the bUnit smoke render test (mirror `ComponentSmokeTests`).
4. Add the `usageStatistics: false` contract test.
5. Run the full test project and confirm green.

## Verification

- `dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj` exits 0.
- Manual check: each test protects a durable contract (module path, render, or
  the usage-statistics default) and none attempts to assert browser-only behavior.

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
