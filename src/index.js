import { library, dom, text } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./components/Note";
import qs from "./helper/qs";
import _, { filter } from "lodash";
import "./style/index.css";
import "./style/App.css";

library.add(faEdit, faTimes, faPlus);
dom.watch();

const state = {
	notes: Array.from(new Array(6), (x) => {
		return new Note();
	}),
	currPost: "",
};

/**
 * 			selected: false,
			color: color,
			btnColor: " #FCFE7D",
 */
/**
 * 		backgroundColor: color,
		border: isSelected ? "3px solid #0198E1" : "none",
		width: "100%",
		minHeight: "18rem",
		backgroundClip: "content-box",
		padding: "4px",
		display: "flex",
		flexDirection: "column",
 */

function intialize() {
	const body = document.querySelector("body");
	body.innerHTML = `<div class="App"><div class="note_group"></div></div>`;
	const noteGroup = document.querySelector(".note_group");
	createNoteHTML(noteGroup);
	createNewNoteButton(noteGroup);
	addDeleteBtnEvent();
	addEditBtnEvent();
}
// Generate HTML

function createNoteHTML(noteGroup) {
	return state.notes.forEach((note) => {
		noteGroup.innerHTML += `<div class="note" data-id=${note.id} >
			<article class="button_group">
				<span class="button btn_edit">
					<i class="fas fa-edit"></i>
				</span>
				<span class="button btn_delete">
					<i class="fas fa-times"></i>
				</span>
			</article>
			<div class="text_body">
				<div class="text text_div">${note.text}</div>
				<textarea class="text text_area hide" type="text" maxlength="255" rows="10">${note.text}</textarea>
			</div>
		</div>`;
	});
}

function createNewNoteButton(noteGroup) {
	const newNoteButton = document.createElement("div");
	newNoteButton.id = "note_new_ca";
	noteGroup.appendChild(newNoteButton);
	newNoteButton.innerHTML += `<i class ="fas fa-plus"></i>`;
}

function resetDom(noteGroup) {
	noteGroup.innerHTML = "";
	createNoteHTML(noteGroup);
	createNewNoteButton(noteGroup);
	addDeleteBtnEvent();
	addEditBtnEvent();
}

// DOM EVENTS

function addEditBtnEvent() {
	const editIcon = document.querySelectorAll(".btn_edit");
	editIcon.forEach((icon) => {
		icon.addEventListener("click", editEvent);
	});
}

function editEvent(e) {
	const noteGroup = document.querySelector(".note_group");
	const noteId = e.target.parentElement.parentElement.dataset.id;
	const textAreas = document.querySelectorAll(".text_area");
	const textDivs = document.querySelectorAll(".text_div");
	// do I have a current note
	// 	if not set it to the current note
	// now i have a current Post means I'm looking at a post
	//  what if I click another edit button
	//  	check if the edit button i clicke has the same id as the curr post
	//  		if so toggle
	if (!state.currPost) {
		state.currPost = noteId;
	} else {
		if (state.currPost === noteId) {
			// console.log("clickgin same post");
			state.notes.find((note) => {
				if (note.id === noteId) {
					if (note.clicked.length < 1) {
						const toggledElements = [];

						for (let txtArea of textAreas) {
							const clickedEditArea = txtArea.parentElement.parentElement;
							const clickedNote = e.target.parentElement.parentElement;
							if (clickedEditArea.dataset.id === clickedNote.dataset.id) {
								toggledElements.push(txtArea);
							}
						}

						for (let txtDiv of textDivs) {
							const clickedEditArea = txtDiv.parentElement.parentElement;
							const clickedNote = e.target.parentElement.parentElement;
							if (clickedEditArea.dataset.id === clickedNote.dataset.id) {
								toggledElements.push(txtDiv);
							}
						}

						console.log(toggledElements);
						toggleTextAreaAndDiv(toggledElements);

						note.clicked.push(note);
					} else if (note.clicked.length === 1) {
						note.text = textArea.value;
						note.clicked.pop(note);
						// toggleTextAreaAndDiv(textArea, textDiv);
						state.currPost = "";
					}
				}
			});
		}
	}
	// console.log(state.currPost, noteId);

	// state.notes.find((note) => {
	// 	if (note.id === noteId) {
	// 		if (note.clicked.length < 1) {
	// 			toggleTextAreaAndDiv(textArea, textDiv);
	// 			note.clicked.push(note);
	// 		} else if (note.clicked.length === 1) {
	// 			note.text = textArea.value;
	// 			note.clicked.pop(note);
	// 			toggleTextAreaAndDiv(textArea, textDiv);
	// 			resetDom(noteGroup);
	// 		}
	// 	}
	// });
}

function getTextAreaAndDiv(textAreas, textDivs) {}

function toggleTextAreaAndDiv(toggledElements) {
	const [textArea, textDiv] = toggledElements;
	console.log(textArea.classList, textDiv.classList);
	textArea.classList.toggle("hide");
	textDiv.classList.toggle("hide");
	// console.dir(textArea, textDiv);
	// textArea.forEach((text) => {
	// 	console.log(text, id);

	// if (text.dataset.id === id) {
	// console.dir(text);
	// text.classList.toggle("hide");
	// }
	// });
	// textDiv.forEach((textDiv) => {
	// 	if (textDiv.dataset.id === id) {
	// 		textDiv.classList.toggle("hide");
	// 	}
	// });
}

function addDeleteBtnEvent() {
	const deleteIcons = document.querySelectorAll(".btn_delete");
	deleteIcons.forEach((icon) => {
		icon.addEventListener("click", deleteEvent);
	});
}

function deleteEvent(e) {
	const noteGroup = document.querySelector(".note_group");
	const noteId = e.target.parentElement.parentElement.dataset.id;
	const filteredNotes = state.notes.filter((note) => note.id !== noteId);
	state.notes = filteredNotes;
	resetDom(noteGroup);
}

document.addEventListener("DOMContentLoaded", intialize);
