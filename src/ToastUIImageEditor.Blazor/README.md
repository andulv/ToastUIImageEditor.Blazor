# ToastUIImageEditor.Blazor

This package provides one `ImageEditor` Blazor component. It hosts the full UI
from TOAST UI Image Editor 3.15.3.

The package includes version-pinned JavaScript and CSS assets. It loads no
runtime CDN. The component sets `usageStatistics: false`.

## Use the component

Add a project or package reference. Then import the namespace and add the
component to an interactive Blazor page.

```razor
@using ToastUIImageEditor.Blazor

<ImageEditor ImageUrl="/images/photo.png" Height="720px" />
```

The first API contains `ImageUrl`, `ImageName`, `Width`, `Height`,
`CssMaxWidth`, and `CssMaxHeight`. Use the native editor UI for edits and the
built-in Download button for output.

## Run the sample

From the repository root, run:

```bash
dotnet run --project samples/ToastUIImageEditor.Blazor.SampleHost
```

The sample loads a bundled image. Use the native UI to edit it. Then use
Download to save the edited image.

## Third-party software

Read [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) for bundled asset
versions, source locations, and MIT license text.
