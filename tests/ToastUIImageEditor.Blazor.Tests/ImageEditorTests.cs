using System.Reflection;
using Bunit;
using ToastUIImageEditor.Blazor;

namespace ToastUIImageEditor.Blazor.Tests;

public sealed class ImageEditorTests : IAsyncDisposable
{
    private readonly BunitContext _context = new();

    public ImageEditorTests()
    {
        _context.JSInterop.Mode = JSRuntimeMode.Loose;
    }

    public async ValueTask DisposeAsync() => await _context.DisposeAsync();

    [Fact]
    public void ImageEditor_ModulePath_Uses_The_Packaged_Static_Asset()
    {
        var property = typeof(ImageEditor).GetProperty(
            "JsModulePath",
            BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

        Assert.NotNull(property);
        Assert.Equal(
            "./_content/ToastUIImageEditor.Blazor/ImageEditor.razor.js",
            property!.GetValue(new ImageEditor()));
    }

    [Fact]
    public void ImageEditor_Renders_Clear_Grouped_Controls()
    {
        var cut = _context.Render<ImageEditor>();

        var groupIds = cut.FindAll(".control-group h2")
            .Select(heading => heading.Id)
            .ToArray();

        Assert.Equal(
            new[] { "view-controls", "history-controls", "image-controls", "draw-controls", "adjustment-controls" }.OrderBy(id => id),
            groupIds.OrderBy(id => id));
        Assert.Equal("0", cut.Find(".history-count").TextContent.Trim());
        Assert.Contains("Zoom level", cut.Markup);
        Assert.Contains("title=\"Zoom out\"", cut.Markup);
        Assert.Contains("title=\"Set zoom level\"", cut.Markup);
        Assert.Contains("title=\"Zoom in\"", cut.Markup);
        Assert.Equal("100", cut.Find("#zoom-level").GetAttribute("value"));
        Assert.Contains("Image information", cut.Markup);
        Assert.Contains("Resolution", cut.Markup);
        Assert.Contains("Format", cut.Markup);
        Assert.Contains("SVG", cut.Markup);
        Assert.Contains("Delete all added objects", cut.Markup);
        Assert.Contains("Resize", cut.Markup);
        Assert.Contains("Custom rotate", cut.Markup);
        Assert.Contains("Start crop", cut.Markup);
        Assert.DoesNotContain("Apply crop", cut.Markup);
        Assert.Contains("Choose free drawing options", cut.Markup);
        Assert.Contains("Choose shape options", cut.Markup);
        Assert.Contains("Choose icon options", cut.Markup);
        Assert.Contains("Choose text options", cut.Markup);
        Assert.DoesNotContain("Draw options", cut.Markup);
        Assert.DoesNotContain("Reset", cut.Markup);
    }

    [Fact]
    public void ImageEditor_Shows_The_Selected_Draw_Tool_Options()
    {
        var cut = _context.Render<ImageEditor>();

        cut.Find("[title='Choose shape options']").Click();

        Assert.Contains("Shape options", cut.Markup);
        Assert.Contains("Rectangle", cut.Markup);
        Assert.Contains("Circle", cut.Markup);
        Assert.Contains("Triangle", cut.Markup);
        Assert.Contains("Add shape", cut.Markup);
        Assert.DoesNotContain("Icon options", cut.Markup);
    }

    [Fact]
    public void ImageEditor_Forwards_UsageStatistics_Disabled_To_The_Interop_Module()
    {
        _context.Render<ImageEditor>();

        var initialize = _context.JSInterop.Invocations.Single(invocation => invocation.Identifier == "initialize");
        var options = initialize.Arguments[1];
        var usageStatistics = options!.GetType().GetProperty("usageStatistics");

        Assert.NotNull(usageStatistics);
        Assert.False((bool)usageStatistics!.GetValue(options)!);
    }

    [Fact]
    public async Task ImageEditor_ExportAsync_Invokes_The_ExportImage_Interop_With_Png_Format()
    {
        var cut = _context.Render<ImageEditor>(parameters => parameters
            .Add(p => p.MaxExportBytes, 4096));

        // bUnit does not run the JS module, so the interop returns no stream and
        // ExportAsync throws (defensive null check) after issuing the call. The
        // issued call — identifier and PNG options — is the contract under test.
        await Assert.ThrowsAsync<InvalidOperationException>(async () =>
            await cut.Instance.ExportAsync("png"));

        var export = _context.JSInterop.Invocations.Single(invocation => invocation.Identifier == "exportImage");
        var options = Assert.IsAssignableFrom<IDictionary<string, object?>>(export.Arguments[1]);
        Assert.Equal("png", options["format"]);
        Assert.False(options.ContainsKey("quality"));
    }
}
