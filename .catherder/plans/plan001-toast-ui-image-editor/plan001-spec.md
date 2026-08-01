---
type: plan-spec
description: "Plan 001 - deliver the smallest browser-verified Blazor wrapper for TOAST UI Image Editor"
status: ready
created: 2026-08-01T14:30:06+02:00
updated: 2026-08-01T14:30:06+02:00
---
# Plan 001 Spec — Minimal TOAST UI Image Editor Wrapper

## 0. Required Context

- `plan-task-standards`
- `blazor-expert`
- `nuget-manager`
- `ketch`
- `AGENTS.md`
- `.agents/project.instructions.md`
- `.agents/catherder.project.instructions.md`
- `README.md`
- `plan001-prompt.md`
- `data/initial-research-2026-08-01.md`
- Official project and documentation: <https://github.com/nhn/tui.image-editor> and <https://nhn.github.io/tui.image-editor/latest/>
- Structural reference: the sibling `WrappedToast` repository, when available in the parent workspace

## 1. Goal

Deliver the smallest useful, reusable Blazor component that hosts the native TOAST UI Image Editor, together with a sample that proves a user can load and edit an image through the upstream full UI in a real browser.

## 2. Context / Why

CatHerder already uses a Blazor wrapper around TOAST UI Editor for Markdown. It needs comparable image-editing support, but CatHerder integration must wait until the wrapper works independently in its own sample application. Starting with a narrow wrapper reduces risk around JavaScript interop, canvas layout, static assets, disposal, and upstream behavior before a larger .NET API is designed.

Initial research identifies upstream version 3.15.3, an MIT-licensed HTML5 Canvas editor with a full built-in UI and a direct JavaScript API. The upstream defaults also enable hostname usage statistics. These facts must be verified during implementation because upstream documentation and releases can change.

## 3. What We Want To Achieve (Outcomes)

- Research current official documentation, release/package metadata, distribution assets, dependencies, licensing, initialization, cleanup, image loading, export/download behavior, sizing, and browser constraints before implementation.
- Add one reusable Blazor image-editor component backed by a small JavaScript interop module.
- Render the upstream full UI with a bundled sample image and enough sizing configuration to be usable in the sample host.
- Let a sample user exercise a representative edit through the built-in UI and obtain the edited image through the simplest upstream-supported UI path, without requiring a CatHerder-specific workflow.
- Bundle or otherwise package version-pinned runtime assets as static web assets so the sample has no runtime CDN dependency.
- Disable upstream usage statistics by default.
- Clean up the native editor and JavaScript references when the Blazor component is disposed.
- Replace the scaffold sample content with a focused image-editor sample page that explains the demonstrated behavior.
- Add a small set of deterministic unit/component tests only for stable wrapper behavior or non-obvious interop contracts that can fail independently of this plan.
- Build and test the solution, then run the sample and verify the complete load/edit/output flow with browser tooling. Record the browser URL, actions, console errors, and result.
- Document package usage, sample execution, asset/version attribution, and the intentionally small initial API.

## 4. Key Principles / Constraints

- Keep the wrapper independent of CatHerder, MudBlazor, and host-specific storage or navigation.
- Prefer the native full UI (`includeUI`) over recreating image-editing controls in Blazor.
- Keep the first public API minimal. Do not mirror the complete upstream API.
- Use a pinned upstream version. Do not load `latest` at runtime.
- Do not require a network connection at sample runtime.
- Treat upstream JavaScript promises and failures as asynchronous operations and surface initialization failures clearly.
- Use Blazor JavaScript module isolation and avoid global host-page script requirements where practical.
- Make initialization safe across Blazor rendering and disposal. Do not initialize against a missing element or leak document-level handlers.
- Use browser verification for canvas, JavaScript, static-asset, layout, editing, and download/export behavior. Unit tests must not claim to prove native browser behavior.
- Keep tests small and behavior-focused. A project test must protect a durable consumer-visible contract or a non-obvious interop/disposal regression.
- Preserve upstream MIT license notices and document all bundled third-party assets and versions.
- Do not modify the parent CatHerder application in this plan.

## 5. Out of Scope

- CatHerder integration.
- A comprehensive C# mirror of all native methods, options, events, object models, filters, themes, or localization APIs.
- Custom Blazor toolbars or a replacement for the upstream full UI.
- Image persistence, upload services, server-side processing, authentication, authorization, or storage-provider integration.
- Advanced two-way state synchronization between JavaScript and .NET.
- Mobile-specific UX, accessibility remediation of upstream internals, or broad cross-browser certification.
- MudBlazor integration.
- Automated end-to-end browser tests unless research finds a small, stable test with clear long-term regression value; direct browser verification is required regardless.
- Packaging or publishing a NuGet release.

## 6. Implementation Notes

Begin by refreshing the saved research against official sources and inspecting WrappedToast's current loader, module isolation, sample, attribution, and disposal patterns. Decide the smallest reliable asset acquisition method that produces version-pinned static web assets in the package without a runtime CDN. Confirm whether the selected distribution bundle already contains its Fabric.js, color-picker, and code-snippet dependencies.

A likely first slice is one element-owning Razor component that initializes `tui.ImageEditor` after first render with `includeUI`, a bundled sample image, bounded dimensions, and `usageStatistics: false`. Keep the JavaScript instance inside a module-owned handle and expose only what the sample requires. Prefer the upstream built-in download/output path for this first slice; add a .NET export API only if research or browser verification shows it is necessary to demonstrate useful operation.

The implementation plan should separate research/asset decisions, wrapper implementation, sample and documentation, focused tests, and final browser verification into reviewable tasks. The executor has browser tooling and must inspect both the rendered result and browser console. Store detailed research or browser evidence under this plan's `data/` directory.

## 7. Open Questions

1. What repository and package identity should be used? (resolved: `ToastUIImageEditor.Blazor` at `https://github.com/andulv/ToastUIImageEditor.Blazor`.)
2. Should this stage create implementation/task files? (resolved: no; this dispatch creates only the prompt, ready spec, and relevant research files.)
3. What constitutes the smallest useful editor behavior? (resolved: the native full UI loads a bundled sample image, supports a representative edit, and provides the simplest working upstream output/download path in the sample.)
4. Should runtime assets come from a CDN? (resolved: no; use version-pinned packaged static assets, with the exact acquisition method chosen after research.)
5. Should usage statistics be enabled? (resolved: no by default; the initial wrapper must pass `usageStatistics: false`.)
6. How is browser-dependent behavior verified? (resolved: run the sample with browser tooling, perform the representative load/edit/output flow, inspect console errors, and record evidence.)
7. How broad should the first .NET API be? (resolved: only the inputs and operations required by the standalone sample; comprehensive API coverage is deferred.)
