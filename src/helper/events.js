import swap from "./swap";
import Note from "../components/Note";
import toggleInputArea from "./toggleInputArea";
import { renderNotes, createNewNoteButton } from "./generateHTML";
import {
	numberOfHighlighted,
	limitOfHighlightedNotes,
	noHighlightedNotes,
	maxNumOfNotes,
} from "../constants";

// SELECT
function highlightAndSelectNote(state) {
	const selectNotes = document.querySelectorAll(".button_group");
	selectNotes.forEach((note) => {
		note.addEventListener("click", handleHighlightAndSelect(state));
	});
}

function handleHighlightAndSelect(state) {
	return function (e) {
		const noteGroup = document.querySelector(".note_group");
		let { notes, clicked } = state;
		const clickedNote = e.target;
		const id = clickedNote.parentElement.dataset.id;
		if (!state.editMode) {
			if (clickedNote.className === "button_group") {
				if (clicked.size === numberOfHighlighted) {
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
					renderDOM(state, noteGroup);
				} else if (clicked.size < limitOfHighlightedNotes) {
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
	};
}

// EDIT
function editBtnEvent(state) {
	const editIcon = document.querySelectorAll(".btn_edit");
	editIcon.forEach((icon) => {
		icon.addEventListener("click", editEvent(state));
	});
}

function editEvent(state) {
	return function (e) {
		e.preventDefault();
		const noteGroup = document.querySelector(".note_group");
		const noteId = e.target.parentElement.parentElement.dataset.id;
		const textBody = e.target.parentElement.nextElementSibling;
		const textDiv = textBody.querySelector(".text_div");
		const textArea = textBody.querySelector(".text_area");
		if (state.clicked.size < numberOfHighlighted) {
			if (state.editMode === false) {
				state.prevNote = state.notes.find((note) => note.id === noteId);
				state.editMode = !state.editMode;
				toggleInputArea(textDiv, textArea);
				textArea.focus();
				textArea.selectionStart = textArea.selectionEnd = textArea.value.length;
			} else if (state.editMode === true && state.prevNote.id === noteId) {
				state.editMode = !state.editMode;
				state.notes.find((note) => {
					if (note.id === noteId) {
						note.updateText(textArea.value);
					}
				});
				toggleInputArea(textDiv, textArea);
				renderDOM(state, noteGroup);
			}
		}
	};
}

// ADD BUTTON
function addNoteBtn(state, noteGroup) {
	const addButton = document.querySelector("#note_new_ca");
	if (!state.editMode && state.clicked.size === 0) {
		addButton.addEventListener("click", addEvent(state, noteGroup));
	}
}

function addEvent(state, noteGroup) {
	return function (e) {
		e.preventDefault();
		if (!state.editMode && state.clicked.size === noHighlightedNotes) {
			const newNote = new Note(state.notes.length);
			if (state.notes.length < maxNumOfNotes) state.notes.push(newNote);
			renderDOM(state, noteGroup);
		}
	};
}

// DELETE
function deleteBtnEvent(state, noteGroup) {
	const deleteIcons = document.querySelectorAll(".btn_delete");
	if (!state.editMode) {
		deleteIcons.forEach((icon) => {
			icon.addEventListener("click", deleteEvent(state, noteGroup));
		});
	}
}

function deleteEvent(state, noteGroup) {
	return function (e) {
		e.preventDefault();
		const noteId = e.target.parentElement.parentElement.dataset.id;
		const filteredNotes = state.notes.filter((note) => note.id !== noteId);
		state.notes = filteredNotes;
		renderDOM(state, noteGroup);
	};
}
// handle blur
function handleBlurEvent(state, noteGroup) {
	const txtAr = document.querySelectorAll("textarea");
	txtAr.forEach((tarea) => {
		tarea.addEventListener("blur", clickOffNote(state, noteGroup));
	});
}
function clickOffNote(state, noteGroup) {
	return function (e) {
		const noteId = e.target.parentElement.parentElement.dataset.id;
		const textArea = e.target;
		const textDiv = textArea.previousElementSibling;
		state.editMode = !state.editMode;
		state.notes.find((note) => {
			if (note.id === noteId) {
				note.updateText(textArea.value);
			}
		});
		toggleInputArea(textDiv, textArea);
		renderDOM(state, noteGroup);
	};
}

// Render | Reset
function renderDOM(state, noteGroup) {
	noteGroup.innerHTML = "";
	renderNotes(state, noteGroup);
	createNewNoteButton(noteGroup);
	editBtnEvent(state);
	addNoteBtn(state, noteGroup);
	deleteBtnEvent(state, noteGroup);
	highlightAndSelectNote(state);
	handleBlurEvent(state, noteGroup);
}

export {
	highlightAndSelectNote,
	editBtnEvent,
	deleteBtnEvent,
	addNoteBtn,
	renderDOM,
};
