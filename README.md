# ToastUIImageEditor.Blazor

A Blazor Razor Class Library intended to provide a thin wrapper around [TOAST UI Image Editor](https://github.com/nhn/tui.image-editor).

The repository is currently an implementation-ready scaffold. It contains:

- `src/ToastUIImageEditor.Blazor` — reusable Razor class library with a `HelloWorld` component.
- `samples/ToastUIImageEditor.Blazor.SampleHost` — Blazor sample application that renders the component.
- `tests/ToastUIImageEditor.Blazor.Tests` — unit test project for future component behavior.
- `.catherder/plans/plan001-toast-ui-image-editor` — prompt, specification, and initial research for the first working wrapper.

No TOAST UI Image Editor assets or runtime integration are included yet.

## Build and test

```bash
dotnet restore ToastUIImageEditor.Blazor.slnx
dotnet build ToastUIImageEditor.Blazor.slnx
dotnet test tests/ToastUIImageEditor.Blazor.Tests/ToastUIImageEditor.Blazor.Tests.csproj
```

## Run the sample

```bash
dotnet run --project samples/ToastUIImageEditor.Blazor.SampleHost
```

Open the URL printed by the application. The sample page displays the library's `HelloWorld` component.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
