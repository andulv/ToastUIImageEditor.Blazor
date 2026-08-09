# ToastUIImageEditor.Blazor

ToastUIImageEditor.Blazor is a Razor Class Library that hosts the full UI from
[TOAST UI Image Editor](https://github.com/nhn/tui.image-editor) 3.15.3.

The package includes its JavaScript, CSS, image assets, Color Picker 2.2.6, and
FileSaver 2.0.5. It does not load a runtime CDN. The component disables TOAST
UI usage statistics.

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

Open the local URL that the host prints. The sample loads a bundled landscape
image. Use the native UI to make an edit. Then use Download to save the result.

## Use the component

Reference the library from an interactive Blazor application. Then import its
namespace and add the component.

```razor
@using ToastUIImageEditor.Blazor

<ImageEditor ImageUrl="/images/photo.png" Height="720px" />
```

The first API is intentionally small:

- `ImageUrl` sets the initial image URL.
- `ImageName` sets the image name in the native editor.
- `Width` and `Height` set the full UI size.
- `CssMaxWidth` and `CssMaxHeight` set the canvas limits.

The wrapper does not mirror the full JavaScript API. It uses the upstream full
UI for editing and downloading.

## Third-party software

See [THIRD-PARTY-NOTICES.md](src/ToastUIImageEditor.Blazor/THIRD-PARTY-NOTICES.md)
for the bundled asset versions, sources, and MIT license text.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
