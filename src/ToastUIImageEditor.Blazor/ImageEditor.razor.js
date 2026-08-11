import { ensureImageEditorAssets } from "./tui-image-editor-loader.js";

const editorContexts = new WeakMap();
const historyLimit = 10;

function createState(instance, history = []) {
    return {
        canUndo: !instance.isEmptyUndoStack(),
        canRedo: !instance.isEmptyRedoStack(),
        canDeleteSelected: false,
        isCropping: false,
        isGrayscaleApplied: instance.hasFilter("Grayscale"),
        history
    };
}

function getContext(element) {
    const context = editorContexts.get(element);
    if (!context) {
        throw new Error("ToastUIImageEditor.Blazor editor is not initialized.");
    }

    return context;
}

function notify(context) {
    context.state.canUndo = !context.instance.isEmptyUndoStack();
    context.state.canRedo = !context.instance.isEmptyRedoStack();
    context.state.isGrayscaleApplied = context.instance.hasFilter("Grayscale");
    void context.dotNetReference?.invokeMethodAsync("NotifyEditorStateChanged", { ...context.state, history: [...context.state.history] }).catch(() => {});
}

function addHistoryEntry(context, entry) {
    if (!entry) {
        return;
    }

    context.state.history = [...context.state.history, String(entry)].slice(-historyLimit);
    notify(context);
}

function attachStateObservers(context) {
    const { instance, state } = context;
    instance.on("undoStackChanged", () => notify(context));
    instance.on("redoStackChanged", () => notify(context));
    instance.on("objectActivated", (object) => {
        state.canDeleteSelected = Boolean(object?.id) && object.type !== "cropzone";
        notify(context);
    });
    instance.on("selectionCleared", () => {
        state.canDeleteSelected = false;
        notify(context);
    });
}

function resize(instance, dimensions) {
    const width = Number(dimensions?.width);
    const height = Number(dimensions?.height);
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1) {
        throw new Error("Image dimensions must be positive integers.");
    }

    return instance.resizeCanvasDimension({ width, height });
}

function rotate(instance, degrees) {
    const angle = Number(degrees);
    if (!Number.isInteger(angle) || angle === 0 || Math.abs(angle) > 360) {
        throw new Error("Rotation must be a whole number from 1 to 360 degrees.");
    }

    return instance.rotate(angle);
}

function getHexColor(value, name) {
    const color = String(value ?? "");
    if (!/^#[\da-f]{6}$/i.test(color)) {
        throw new Error(`${name} must be a six-digit hexadecimal color.`);
    }

    return color;
}

function getWholeNumber(value, name, minimum, maximum) {
    const number = Number(value);
    if (!Number.isInteger(number) || number < minimum || number > maximum) {
        throw new Error(`${name} must be a whole number from ${minimum} to ${maximum}.`);
    }

    return number;
}

function zoom(instance, percent) {
    const zoomPercent = getWholeNumber(percent, "Zoom", 10, 500);
    const { width, height } = instance.getCanvasSize();
    instance.zoom({ x: width / 2, y: height / 2, zoomLevel: zoomPercent / 100 });
}

function startFreeDrawing(instance, options) {
    return instance.startDrawingMode("FREE_DRAWING", {
        color: getHexColor(options?.color, "Brush color"),
        width: getWholeNumber(options?.width, "Brush width", 1, 50)
    });
}

function addShape(instance, options) {
    const type = String(options?.type ?? "");
    if (!["rect", "circle", "triangle"].includes(type)) {
        throw new Error("Shape type must be rectangle, circle, or triangle.");
    }

    const common = {
        fill: getHexColor(options?.fill, "Fill color"),
        stroke: getHexColor(options?.stroke, "Stroke color"),
        strokeWidth: getWholeNumber(options?.strokeWidth, "Stroke width", 1, 20)
    };
    const dimensions = type === "circle" ? { rx: 80, ry: 80 } : { width: 160, height: 100 };

    return instance.addShape(type, { ...common, ...dimensions });
}

function addIcon(instance, options) {
    const type = String(options?.type ?? "");
    if (!["arrow", "cancel"].includes(type)) {
        throw new Error("Icon type must be arrow or cancel.");
    }

    return instance.addIcon(type, { fill: getHexColor(options?.color, "Icon color") });
}

function addText(instance, options) {
    const text = String(options?.text ?? "").trim();
    if (!text) {
        throw new Error("Text cannot be empty.");
    }

    return instance.addText(text, {
        styles: {
            fill: getHexColor(options?.color, "Text color"),
            fontSize: getWholeNumber(options?.fontSize, "Text size", 8, 144)
        }
    });
}

const historyLabels = {
    undo: "Undo",
    redo: "Redo",
    resize: "Resized image",
    startCrop: "Started crop",
    applyCrop: "Applied crop",
    cancelCrop: "Cancelled crop",
    flipHorizontal: "Flipped horizontally",
    flipVertical: "Flipped vertically",
    rotateClockwise: "Rotated right 90°",
    rotateCounterclockwise: "Rotated left 90°",
    rotateCustom: "Custom rotation",
    freeDraw: "Started drawing",
    addShape: "Added shape",
    addIcon: "Added icon",
    addText: "Added text",
    deleteSelected: "Deleted selected object",
    deleteAll: "Deleted all added objects",
    toggleGrayscale: "Toggled grayscale"
};

export async function initialize(element, options, dotNetReference) {
    if (!element) {
        throw new Error("ToastUIImageEditor.Blazor requires an editor element.");
    }

    await ensureImageEditorAssets();
    dispose(element);

    const {
        imageUrl,
        imageName = "Image",
        width = "100%",
        height = "700px",
        cssMaxWidth = 1000,
        cssMaxHeight = 600,
        usageStatistics = false,
        useDefaultUi = false
    } = options ?? {};

    if (!imageUrl) {
        throw new Error("ToastUIImageEditor.Blazor requires an initial image URL.");
    }

    element.style.width = width;
    element.style.height = height;

    const editorOptions = {
        cssMaxWidth,
        cssMaxHeight,
        usageStatistics
    };
    if (useDefaultUi) {
        editorOptions.includeUI = {
            menu: ["crop", "flip", "rotate", "draw", "shape", "icon", "text", "mask", "filter"],
            menuBarPosition: "bottom",
            uiSize: { width, height }
        };
    }

    const instance = new globalThis.tui.ImageEditor(element, editorOptions);
    await instance.loadImageFromURL(imageUrl, imageName);

    const context = {
        instance,
        dotNetReference,
        state: createState(instance)
    };
    editorContexts.set(element, context);
    attachStateObservers(context);
    notify(context);
}

export function getControlState(element) {
    const { state } = getContext(element);
    return { ...state, history: [...state.history] };
}

export function getCanvasSize(element) {
    const { instance } = getContext(element);
    const { width, height } = instance.getCanvasSize();
    return { width: Math.round(width), height: Math.round(height) };
}

export async function exportImage(element, options) {
    const { instance } = getContext(element);
    const format = String(options?.format ?? "png");
    const exportOptions = { format };
    if (Number.isFinite(options?.quality)) {
        exportOptions.quality = options.quality;
    }

    // tui.image-editor 3.15.3: toDataURL({format, quality}) returns a data-URL
    // string synchronously. Convert it to a Blob so Blazor receives an
    // IJSStreamReference instead of a base64 string.
    const dataUrl = instance.toDataURL(exportOptions);
    const response = await fetch(dataUrl);
    return await response.blob();
}

export async function runOperation(element, operation, argument) {
    const context = getContext(element);
    const { instance, state } = context;
    let completed = false;

    switch (operation) {
        case "zoom":
            zoom(instance, argument?.percent);
            break;
        case "undo":
            if (state.canUndo) {
                await instance.undo();
                completed = true;
            }
            break;
        case "redo":
            if (state.canRedo) {
                await instance.redo();
                completed = true;
            }
            break;
        case "resize":
            await resize(instance, argument);
            completed = true;
            break;
        case "startCrop":
            instance.startDrawingMode("CROPPER");
            instance.setCropzoneRect();
            state.isCropping = true;
            completed = true;
            break;
        case "applyCrop": {
            const rect = instance.getCropzoneRect();
            if (rect?.width > 0 && rect?.height > 0) {
                await instance.crop(rect);
                completed = true;
            }
            instance.stopDrawingMode();
            state.isCropping = false;
            break;
        }
        case "cancelCrop":
            instance.stopDrawingMode();
            state.isCropping = false;
            completed = true;
            break;
        case "flipHorizontal":
            await instance.flipX();
            completed = true;
            break;
        case "flipVertical":
            await instance.flipY();
            completed = true;
            break;
        case "rotateClockwise":
            await rotate(instance, 90);
            completed = true;
            break;
        case "rotateCounterclockwise":
            await rotate(instance, -90);
            completed = true;
            break;
        case "rotateCustom":
            await rotate(instance, argument?.degrees);
            completed = true;
            break;
        case "freeDraw":
            startFreeDrawing(instance, argument);
            completed = true;
            break;
        case "addShape":
            await addShape(instance, argument);
            completed = true;
            break;
        case "addIcon":
            await addIcon(instance, argument);
            completed = true;
            break;
        case "addText":
            await addText(instance, argument);
            completed = true;
            break;
        case "deleteSelected":
            if (state.canDeleteSelected) {
                instance.removeActiveObject();
                completed = true;
            }
            break;
        case "deleteAll":
            if (window.confirm("Delete all added objects? The base image will stay unchanged.")) {
                await instance.clearObjects();
                completed = true;
            }
            break;
        case "toggleGrayscale":
            if (instance.hasFilter("Grayscale")) await instance.removeFilter("Grayscale");
            else await instance.applyFilter("Grayscale");
            completed = true;
            break;
        default:
            throw new Error(`Unsupported editor operation: ${operation}`);
    }

    if (completed) {
        addHistoryEntry(context, historyLabels[operation]);
    }

    notify(context);
}

export function dispose(element) {
    const context = editorContexts.get(element);
    if (!context) {
        return;
    }

    context.dotNetReference = null;
    context.instance.destroy();
    editorContexts.delete(element);
}
