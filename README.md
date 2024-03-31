<div align="center">
  <h1>Shape Editing Web App</h1>
  <a href="https://github.com/albertosanchez14/shape-editing-app">
    <img src="https://github.com/albertosanchez14/shape-editing-app/blob/master/public/a3-screencap.png" alt="Preview" width=800/>
  </a>
</div>
This web application allows users to manage and edit shapes. It features a left and right side layout, with the left side containing a toolbar, a shape list, and a status bar, while the right side displays details or messages based on the selected shape.

## Features

- **Toolbar**: Contains buttons for adding, deleting, and clearing shapes, as well as a dropdown for selecting the shape to add.
- **Shape List**: Initially contains 8 square shapes with random hues. Each shape is displayed in a 50px by 50px area with a 20px gap between shapes.
- **Status Bar**: Displays the number of shapes in the list or the number of selected shapes, as well as a message when the list is full or when too many shapes are selected.
- **Mouse Hover Effect**: Shapes in the list have a 4px light blue outline on hover.
- **Selection**: Clicking on a shape selects it, indicated by a 1px blue outline. Clicking on a selected shape deselects it.
- **Editing**: When a single shape is selected, the right side displays an editor for that shape. For squares, the editor allows editing of the hue value. For stars, the editor allows editing of hue, outer radius, and number of points. For bullseyes, the editor allows editing of hues for the rings. For cats, the editor allows editing of hue and look direction.
- **Keyboard Interaction**: Holding the Shift key allows for multiple selection without deselecting others.
- **Button Disabling**: Add button is disabled when there are 25 shapes, delete button is disabled when no shapes are selected, and clear button is disabled when there are no shapes.

## Additional Shapes

- **Stars**: Stars can be added to the list, with a random hue for the fill, a 15px inner radius, a randomly generated outer radius between 20px and 45px, and a randomly generated number of points between 3 and 10.
- **Bullseyes**: Bullseyes can be added to the list, with a radius of 45px, two random hues for the alternating rings, and a randomly generated number of rings between 2 and 5.
- **Cats**: Cats can be added to the list, fitting inside approximately a 90px by 90px area, with a random hue and a randomly generated look direction (left, centre, or right).

## Usage

1. Open the web application.
2. Use the toolbar to add, delete, and clear shapes.
3. Select a shape from the dropdown and click "Add" to add a new shape.
4. Click on a shape in the list to select it and display its properties in the editor on the right side.
5. Edit the shape properties in the editor as desired.
6. Use the Shift key for multiple selection without deselecting others.
7. Interact with the shapes and editor as needed, following the outlined features and behaviors.

## Limitations

- The app supports up to 25 shapes in the list.
- Editing features are limited to the properties specified for each shape type (square, star, bullseye, cat).

## Run Locally

Clone the project

```bash
  git clone https://github.com/albertosanchez14/shape-editing-app.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
## Credits

This web application was created by Alberto Sánchez. It utilizes Preact with TypeScript to provide a user-friendly interface for managing and editing shapes.
