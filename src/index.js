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
	showInput: false,
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
	const textBody = e.target.parentElement.nextElementSibling;
	const textDiv = textBody.querySelector(".text_div");
	const textArea = textBody.querySelector(".text_area");
	if (!state.showInput) {
		console.log(state.showInput);
		state.showInput = !state.showInput;
		toggleInputArea(textDiv, textArea);
	} else {
		console.log(state.notes);
		state.showInput = !state.showInput;
		state.notes.find((note) => {
			if (note.id === noteId) {
				note.updateText(textArea.value);
			}
		});
		toggleInputArea(textDiv, textArea);
		resetDom(noteGroup);
	}
}

function toggleInputArea(textDiv, textArea) {
	textArea.classList.toggle("hide");
	textDiv.classList.toggle("hide");
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
