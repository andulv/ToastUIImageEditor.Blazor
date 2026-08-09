---
created: 2026-08-02T16:32:49+02:00
updated: 2026-08-02T16:32:49+02:00
---
# Plan 002 Prompt

## Original prompt

UI for edit in our component is a bit ugly, confusing and dated.

Suggestions
1. Grouping of operations, 
As of today, there is one toolbar above and one below. Dividers in top toolbar seperate groups of buttons. Except from that all buttons seem equal at first glance
- View: Zoom, Hand (These dont affect image, only our view)
- History: View history, undo, redo, reset (Reset is dangerous! To me it seems like "discard all changes with no undo". I think we can remove it)
- Then we have the "trashcans". To me it seems like they are for deleting added elements (see below). 

- Image: Resize, Crop, Flip, Rotate - These operate on image as whole
- Draw: Draw, Shape, Icon, Text - These add elements to image
- Image adjustment: Mask, Filter - I think these also operate on image as whole

Draw operations should be cleary seperated group from. Trashcan(s) should go here too. the "all" trashcan needs confirmation dialog.

You figure out the rest:
Pri 1 - Ease of use, intuitive to use for first time users
Pri 2 - Look pretty, modern and visual appealing (without stealing focus from actual image...)

## Interpreted prompt

Improve the interactive image-editor UI. Group controls by their effect: View,
History, Image, Draw, and Image Adjustment. Remove Reset from the primary UI.
Keep deletion controls with Draw. Ask for confirmation before Delete All removes
all added elements.

Prioritize first-time-user clarity. Then make the UI modern and visually
appealing without distracting from the image.
