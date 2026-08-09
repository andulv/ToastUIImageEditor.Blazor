const ASSET_ROOT = "_content/ToastUIImageEditor.Blazor/lib";
const FILE_SAVER_SCRIPT_PATH = `${ASSET_ROOT}/file-saver/2.0.5/FileSaver.min.js`;
const COLOR_PICKER_SCRIPT_PATH = `${ASSET_ROOT}/tui-color-picker/2.2.6/tui-color-picker.min.js`;
const IMAGE_EDITOR_SCRIPT_PATH = `${ASSET_ROOT}/tui-image-editor/3.15.3/tui-image-editor.min.js`;
const STYLESHEET_PATHS = [
    `${ASSET_ROOT}/tui-color-picker/2.2.6/tui-color-picker.min.css`,
    `${ASSET_ROOT}/tui-image-editor/3.15.3/tui-image-editor.min.css`
];

function getLoaderState() {
    const loaderKey = "__toastUiImageEditorLoader";
    const state = globalThis[loaderKey];
    if (state) {
        return state;
    }

    const nextState = { promise: null };
    globalThis[loaderKey] = nextState;
    return nextState;
}

function hasAssetTag(tagName, assetPath) {
    return Array.from(document.head.querySelectorAll(tagName)).some((element) => {
        const attribute = tagName === "link" ? "href" : "src";
        return element.getAttribute(attribute) === assetPath;
    });
}

function ensureStylesheet(href) {
    if (hasAssetTag("link", href)) {
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

function waitForExistingScript(script, isLoaded, assetName) {
    return new Promise((resolve, reject) => {
        if (isLoaded()) {
            resolve();
            return;
        }

        script.addEventListener("load", () => {
            if (isLoaded()) {
                resolve();
            } else {
                reject(new Error(`${assetName} loaded without exposing its expected global.`));
            }
        }, { once: true });
        script.addEventListener("error", () => reject(new Error(`Failed to load ${assetName}.`)), { once: true });
    });
}

function ensureScript(src, isLoaded, assetName) {
    if (isLoaded()) {
        return Promise.resolve();
    }

    const existingScript = Array.from(document.head.querySelectorAll("script")).find((element) => {
        return element.getAttribute("src") === src;
    });

    if (existingScript) {
        return waitForExistingScript(existingScript, isLoaded, assetName);
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.addEventListener("load", () => {
            if (isLoaded()) {
                resolve();
            } else {
                reject(new Error(`${assetName} loaded without exposing its expected global.`));
            }
        }, { once: true });
        script.addEventListener("error", () => reject(new Error(`Failed to load ${assetName}.`)), { once: true });
        document.head.appendChild(script);
    });
}

export async function ensureImageEditorAssets() {
    const state = getLoaderState();
    if (!state.promise) {
        state.promise = (async () => {
            STYLESHEET_PATHS.forEach(ensureStylesheet);
            await ensureScript(FILE_SAVER_SCRIPT_PATH, () => typeof globalThis.saveAs === "function", "FileSaver");
            await ensureScript(COLOR_PICKER_SCRIPT_PATH, () => Boolean(globalThis.tui?.colorPicker), "TOAST UI Color Picker");
            await ensureScript(IMAGE_EDITOR_SCRIPT_PATH, () => Boolean(globalThis.tui?.ImageEditor), "TOAST UI Image Editor");
        })().catch((error) => {
            state.promise = null;
            throw error;
        });
    }

    await state.promise;
}
