# Control API Mapping — 2026-08-02

## Decision

Build a wrapper-owned control surface. Keep the native `tui.ImageEditor`
instance private to `ImageEditor.razor.js`. Do not read, move, hide, or restyle
upstream toolbar elements by selector.

The wrapper will expose only the methods in the table below. A control that has
no supported direct API is omitted or shown as plain guidance. It is not a
button that calls private `ui`, `graphics`, or toolbar-action members.

## Group mapping

| Group | User action | Native contract | Decision |
|---|---|---|---|
| View | Zoom | `zoom({ x, y, zoomLevel })`, `getCanvasSize()` | The pinned public JSDoc source documents absolute zoom levels from 1.0 to 5.0, although its shipped declaration omits the methods. Keep zoom state wrapper-owned, zoom around the public canvas-size centre, and offer minus, plus, and a validated percentage input from 10% to 500%. Do not use private `graphics` state. |
| View | Hand / pan | No public direct hand-mode API in the declarations. | Show the native canvas instruction: hold Space and drag to pan. Do not add an unsupported Hand button. |
| Canvas status | Image information | `getCanvasSize()` plus wrapper parameters `ImageName` and `ImageUrl` | Render a wrapper-owned status bar below the canvas. Show name, current canvas resolution, URL-derived format, and wrapper-owned zoom. Refresh resolution after initialization and each wrapper operation. |
| History | View history | Wrapper-owned operation journal. | Record successful wrapper operations directly, rather than depending on optional native event delivery. Show the operation count with the History heading. It is not an editable native history stack. |
| History | Undo | `isEmptyUndoStack()`, `undo()` | Disable when the stack is empty. |
| History | Redo | `isEmptyRedoStack()`, `redo()` | Disable when the stack is empty. |
| History | Reset | The native UI reloads the initial image and clears history. | Omit. It is destructive and out of scope for this control surface. |
| Image | Resize | `getCanvasSize()`, `resizeCanvasDimension(dimension)` | Open a wrapper dialog populated from the current canvas size. Validate positive integer values before calling the editor. When Keep aspect ratio is enabled, calculate the other dimension from the reported canvas ratio. |
| Image | Crop | `setCropzoneRect()`, `getCropzoneRect()`, `crop(rect)`, `stopDrawingMode()` | Show Start crop until the wrapper enters crop mode. Then replace it with adjacent Apply crop and Cancel crop controls. |
| Image | Flip | `flipX()`, `flipY()` | Provide horizontal and vertical controls. |
| Image | Rotate | `rotate(angle)` | Provide clockwise and counterclockwise 90-degree controls plus a wrapper dialog for a validated custom positive degree value and direction. |
| Draw | Draw | `startDrawingMode('FREE_DRAWING', option)`, `stopDrawingMode()` | Selecting Draw shows brush color and width options. Starting drawing passes the selected values. |
| Draw | Shape | `addShape(type, options)` | Selecting Shape shows rectangle, circle, and triangle choices plus fill, stroke, and stroke-width options. Add shape passes only the selected public options. |
| Draw | Icon | `addIcon(type, options)` | Selecting Icon shows arrow and cancel icon choices plus a color option. Add icon passes the selected public options. |
| Draw | Text | `addText(text, options)` | Selecting Text shows content, color, and size options. Add text passes the selected public options. |
| Draw | Delete selected | `removeActiveObject()` | Disable until the wrapper observes an active added object. |
| Draw | Delete all | `clearObjects()` | Call only after a native browser confirmation. The pinned command removes objects without the background image and is undoable. |
| Image Adjustment | Filter | `applyFilter('Grayscale')`, `removeFilter('Grayscale')`, `hasFilter('Grayscale')` | Provide a single grayscale toggle for the first slice. |
| Image Adjustment | Mask | The public API needs a mask object ID, which requires a separate local image-selection flow. | Do not expose Mask in this slice. Explain the omission in the group help text rather than adding a non-working control. |

## State and confirmation

T02 must use public stack queries and public event subscription to refresh Undo,
Redo, selected-object Delete, grayscale availability, and wrapper crop-mode
state. It must not infer state from native toolbar classes or selection markup.
The resize dialog reads only the documented `getCanvasSize()` result; it does
not inspect canvas DOM or native private state. The operation journal records
successful wrapper commands so a native callback cannot overwrite its state.

Use `window.confirm` immediately before `clearObjects()`. It is a browser-native,
keyboard-accessible modal with an explicit Cancel result. The wrapper must not
call `clearObjects()` when the result is false. The confirmation text must state
that it removes all added objects and leaves the base image unchanged.

## Safety finding

The `clearObjects` command calls `graphics.removeAll()` without its
`includesBackground` argument. The graphics implementation clears the canvas
background only when that argument is true. Therefore `clearObjects()` removes
added objects and preserves the base image. It also saves removed objects for
Undo.

## Sources

- Public constructor, `getCanvasSize()`, crop, resize, and rotation method documentation:
  <https://nhn.github.io/tui.image-editor/latest/ImageEditor/>
- Pinned public type declarations, including `clearObjects`, `removeActiveObject`,
  stack queries, drawing methods, image operations, and `on`:
  <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/index.d.ts>
- Pinned public JSDoc source for `zoom({ x, y, zoomLevel })` (1.0–5.0) and `resetZoom()`. The declaration omission is recorded above:
  <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/js/imageEditor.js>
- Pinned `clearObjects` implementation and its background-image behavior:
  <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/js/command/clearObjects.js>
- Pinned upstream action source, which identifies native reset as initial-image
  reload plus history clearing:
  <https://raw.githubusercontent.com/nhn/tui.image-editor/v3.15.3/apps/image-editor/src/js/action.js>
