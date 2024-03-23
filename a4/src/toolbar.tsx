import "./toolbar.css";


export default function ToolBarView() {
  return (
    <div id="tool-bar">
      <button class="button" id="add-button">Add</button>
      <select class="button" id="options">
        <option value="square">Square</option>
        <option value="star">Star</option>
        <option value="bullseye">Bullseye</option>
        <option value="cat">Cat</option>
      </select>
      <button class="button" id="remove-button">Remove</button>
      <button class="button" id="clear">Clear</button>
    </div>
  )
}
