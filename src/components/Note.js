import { v4 as uuidv4 } from "uuid";

class Note {
	constructor(color, btnColor) {
		this.id = uuidv4();
		this.text = "";
		this.color = color;
		this.btnColor = btnColor;
		this.clicked = false;
	}

	updateText(text) {
		this.text = text;
	}
}

export default Note;
