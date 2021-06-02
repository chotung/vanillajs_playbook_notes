import { v4 as uuidv4 } from "uuid";

class Note {
	constructor(color, btnColor) {
		this.id = uuidv4();
		this.text = "some random text";
		this.color = color;
		this.btnColor = btnColor;
		this.clicked = [];
	}
}

export default Note;
// id: nextId(),
// selected: false,
// color: color,
// btnColor: " #FCFE7D",
