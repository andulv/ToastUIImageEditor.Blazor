namespace ToastUIImageEditor.Blazor;

internal sealed class ImageEditorControlState
{
    public bool CanUndo { get; set; }

    public bool CanRedo { get; set; }

    public bool CanDeleteSelected { get; set; }

    public bool IsCropping { get; set; }

    public bool IsGrayscaleApplied { get; set; }

    public IReadOnlyList<string> History { get; set; } = [];
}
