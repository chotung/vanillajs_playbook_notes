import { v4 as uuidv4 } from "uuid";

class Note {
	constructor(index) {
		this.id = uuidv4();
		this.text = "";
		this.index = index;
		this.clicked = false;
	}

	updateText(text) {
		this.text = text;
	}
	generateHTML() {
		return `<div class="note" data-id=${this.id} >
			<article class="button_group">
				<span class="button btn_edit">
					<i class="fas fa-edit"></i>
				</span>
				<span class="button btn_delete">
					<i class="fas fa-times"></i>
				</span>
			</article>
			<div class="text_body">
				<div class="text text_div">${this.text}</div>
				<textarea class="text text_area hide" type="text" autofocus maxlength="255"  rows="10">${this.text}</textarea>
			</div>
		</div>`;
	}
}

export default Note;
