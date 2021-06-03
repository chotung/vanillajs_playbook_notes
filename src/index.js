import { library, dom, text } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./components/Note";
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
	clicked: new Set(),
};

function intialize() {
	const body = document.querySelector("body");
	body.innerHTML = `<div class="App"><div class="note_group"></div></div>`;
	const noteGroup = document.querySelector(".note_group");
	createNoteHTML(noteGroup);
	createNewNoteButton(noteGroup);
	deleteBtnEvent();
	editBtnEvent();
	addBtnEvent();
	selectNoteEvent();
}
// app.addEventListener("click", function () {
// 	console.log("clicked somewhere else");
// 	console.log(state.showInput);
// });

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
				<textarea class="text text_area hide" type="text" autofocus maxlength="255"  rows="10">${note.text}</textarea>
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
	deleteBtnEvent();
	editBtnEvent();
	addBtnEvent();
	selectNoteEvent();
}

// DOM EVENTS
function selectNoteEvent() {
	const selectNotes = document.querySelectorAll(".button_group");
	selectNotes.forEach((note) => {
		note.addEventListener("click", select);
	});
}

function select(e) {
	const noteGroup = document.querySelector(".note_group");
	let { notes, clicked } = state;
	const clickedNote = e.target;
	const id = clickedNote.parentElement.dataset.id;
	if (clickedNote.className === "button_group") {
		if (clicked.size === 1) {
			const indexes = [];
			notes.forEach((note, idx) => {
				if (note.id === id) {
					indexes.push(idx);
				}
				if (note.id === clicked.values().next().value) {
					indexes.push(idx);
				}
			});
			swap(notes, indexes[0], indexes[1]);
			clicked.clear();
			resetDom(noteGroup);
		} else if (clicked.size < 2) {
			if (clicked.has(id)) {
				clicked.delete(id);
				clickedNote.parentElement.classList.toggle("selected");
			} else {
				clicked.add(id);
				clickedNote.parentElement.classList.toggle("selected");
			}
		}
	}
}

// helper function
function swap(arr, clickedId, storedId) {
	let temp = arr[clickedId];
	arr[clickedId] = arr[storedId];
	arr[storedId] = temp;
	return arr;
}

function editBtnEvent() {
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
	// When I click off I should also save
	if (!state.showInput) {
		state.showInput = !state.showInput;
		toggleInputArea(textDiv, textArea);
		textArea.focus();
		textArea.selectionStart = textArea.selectionEnd = textArea.value.length;
	} else {
		// finish editing
		// true here then becomes false
		if (state.showInput === true) state.showInput = !state.showInput;
		state.notes.find((note) => {
			if (note.id === noteId) {
				note.updateText(textArea.value);
			}
		});
		toggleInputArea(textDiv, textArea);
		// edit deselects
		// update the clicked
		resetDom(noteGroup);
	}
}

function toggleInputArea(textDiv, textArea) {
	textArea.classList.toggle("hide");
	textDiv.classList.toggle("hide");
}

function deleteBtnEvent() {
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

function addBtnEvent(e) {
	const addButton = document.querySelector("#note_new_ca");
	addButton.addEventListener("click", addEvent);
}

function addEvent() {
	const noteGroup = document.querySelector(".note_group");
	const newNote = new Note();
	if (state.notes.length < 36) state.notes.push(newNote);
	resetDom(noteGroup);
}

document.addEventListener("DOMContentLoaded", intialize);
