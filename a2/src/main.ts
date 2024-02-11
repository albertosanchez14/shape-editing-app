import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

// local imports
import { Model } from "./model";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";


// create model
const model = new Model();

// root container
const root = new SKContainer();
root.id = "root";
root.fill = "whitesmoke";
root.layoutMethod = Layout.makeCentredLayout();

// main panel
const panel = new SKContainer();
panel.fillWidth = 1;
panel.fillHeight = 1;
panel.layoutMethod = Layout.makeFillRowLayout();

// add main panel to root
root.addChild(panel);

// add views to main panel
panel.addChild(new LeftView(model));
panel.addChild(new RightView(model));


setSKRoot(root);

startSimpleKit();








// TODO: The squares in the list have a mouse hover effect. The effect is a thick outline using the standard SimpleKit highlight colour style.

// TODO: Clicking on a square in the list "selects" it. A selected square is indicated by a thin outline slightly offset from the square using the standard SimpleKit focus colour style.

// TODO: When a single square is selected, the right side displays a square "editor". The editor displays the square above an editing form.
// TODO: The vertical space of the editor is divided approximately two-thirds for a square "display" area and one-third for an editing "form" below. The form is outlined in a 1-pixel grey line set inside by 10px from the editor border.
// TODO: When editing a square, the square is centred in the top display area. The square is scaled to be as large as possible while preserving approximately a minium of 10px away from the editor and form borders.
// TODO: When editing a square, a labelled hue textfield is displayed at the top of form. When the square selection triggers editing, the hue value for the square's fill is displayed in the textfield.
// TODO: When editing a square, changing the number in the hue textfield changes the corresponding hue of the selected square and simultaneously in the selected square in the shape list.
// TODO: The hue textfield accepts any string input, but only strings that form numeric values between 0 and 360 change the hue.
// TODO: NOTE: A normal UI would show prevent non-numeric characters, provide an error message explaining the valid range, and add some visualization when the textfield has an invalid value. But to keep the assignment simpler, you should not do any of this.
// TODO: If no square is selected, the right side displays the message "Select One". The message is centred inside the right area.
// TODO: Clicking on a selected square deselects it.
// TODO: Pressing the "Delete" button when one square is selected deletes that square from the list. If the deleted square was not the last square in the list, the square positions adjust to fill in the missing place. A deleted square is no also no longer considered selected by the app.
// TODO: Pressing the "Clear" button deletes all squares.

// TODO: When the "Shift" key is NOT held down, clicking on an unselected square selects that square and deselects any other selected squares.
// TODO: When the "Shift" key is held down, clicking on an unselected square selects that square, but does not deselect any other square. Clicking on a selected square deselects it, but does not deselect any other square.
// TODO: You may find it useful to display the word "SHIFT" in the statusbar to verify you're setting the state of the Shift key correctly. This is done in the video, but note this isn't a requirement.
// TODO: When one or more squares are selected, the statusbar displays a right-aligned message showing the number of selected squares, e.g. "selected 1", "selected 2", etc. The message is vertically centered and approximately 10px from the right edge of the statusbar.
// TODO: Adding a square with the "Add" button does not change the current square selection states. There can be no more than 20 squares.
// TODO: You may find it useful to display the word "FULL" in the statusbar when the list has 20 shapes to verify you're tracking the number of shapes correctly. This is done in the video, but note this isn't a requirement.
// TODO: When more than one square is selected, the right side displays the message "Too Many Selected". The message is centred inside the right area.
// TODO: Clicking on the white background of the shape list area, and outside of any square in the list, deselects all squares.
// TODO: Toolbar buttons are disabled under certain conditions. A disabled button is drawn in lighter grays, there are no hover or down effects, and it won't send any bound events. "Add" and "Add Star" are disabled when there are 20 shapes in the list. "Delete" is disabled when no shapes are selected. "Clear" is disabled when there are no shapes in the list.
// TODO: HINT: Extend SKButton to add a way to enable or disable a button.
// TODO: Pressing "Add Star" adds a star shape to the shape list. A new star has a random hue for the fill (between 0 and 360, like squares), a 15px inner radius, a randomly generated outer radius (between 20px and 45px), and a randomly generated number of points (between 3 and 10).
// TODO: NOTE: The maximum outer radius means stars can be up to 90x in diameter. This means they must be scaled to fit within the 50px by 50px shape area in the shape list. Draw your star centred inside a 100px by 100px area with a thin grey border, then scale to fit into the shape area in the list.
// TODO: HINT: Create a custom SKStar widget.
// TODO: Stars and squares are both considered shapes, so all the shape list behaviours for squares (e.g. selection, deleting, clearing, hover, maximum number, etc.) work for the combined set of stars and squares in the shape list.
// TODO: For example: clicking on a star deselects any other shapes including squares; a Shift click can select multiple stars and squares together; the statusbar displays the total number of shapes that are selected; there can be no more than 20 shapes total; etc.
// TODO: Selecting a single star (with no other shapes selected, including squares), displays the star in