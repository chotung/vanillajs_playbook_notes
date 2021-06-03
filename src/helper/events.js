import swap from "./swap";
import toggleInputArea from "./toggleInputArea";
import { createNoteHTML, createNewNoteButton } from "./generateHTML";

// SELECT
function selectNoteEvent(state) {
	const selectNotes = document.querySelectorAll(".button_group");
	selectNotes.forEach((note) => {
		note.addEventListener("click", select(state));
	});
}

function select(state) {
	return function (e) {
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
				resetDom(noteGroup.state);
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
	};
}

// EDIT
function editBtnEvent(state) {
	const editIcon = document.querySelectorAll(".btn_edit");
	editIcon.forEach((icon) => {
		icon.addEventListener("click", editEvent(e));
	});
}

function editEvent(e) {
	console.log(state);
	const noteGroup = document.querySelector(".note_group");
	const noteId = e.target.parentElement.parentElement.dataset.id;
	const textBody = e.target.parentElement.nextElementSibling;
	const textDiv = textBody.querySelector(".text_div");
	const textArea = textBody.querySelector(".text_area");
	if (!state.showInput) {
		state.showInput = !state.showInput;
		toggleInputArea(textDiv, textArea);
		textArea.focus();
		textArea.selectionStart = textArea.selectionEnd = textArea.value.length;
	} else {
		if (state.showInput === true) state.showInput = !state.showInput;
		state.notes.find((note) => {
			if (note.id === noteId) {
				note.updateText(textArea.value);
			}
		});
		toggleInputArea(textDiv, textArea);
		resetDom(noteGroup, state);
	}
}

// EDIT
function deleteBtnEvent(state) {
	const deleteIcons = document.querySelectorAll(".btn_delete");
	deleteIcons.forEach((icon) => {
		icon.addEventListener("click", deleteEvent(state));
	});
}

function deleteEvent(state) {
	return function (e) {
		const noteGroup = document.querySelector(".note_group");
		const noteId = e.target.parentElement.parentElement.dataset.id;
		const filteredNotes = state.notes.filter((note) => note.id !== noteId);
		state.notes = filteredNotes;
		resetDom(noteGroup, state);
	};
}

// ADD BUTTON
function addBtnEvent(state) {
	const addButton = document.querySelector("#note_new_ca");
	addButton.addEventListener("click", addEvent(state));
}

function addEvent(state) {
	return function () {
		const noteGroup = document.querySelector(".note_group");
		const newNote = new Note();
		if (state.notes.length < 36) state.notes.push(newNote);
		resetDom(noteGroup, state);
	};
}

// clicking off the note
function handleClickingOff(body, state) {
	return function () {
		body.addEventListener("click", function (e) {
			console.log("clicking offf");
			const noteGroup = document.querySelector(".note_group");
			if (state.showInput === true && !e.target.className.includes("button")) {
				const textArea = document.querySelector(".text.text_area:not(.hide)");
				const textDiv = document.querySelector(".text.text_div");
				const noteId = textArea.parentElement.parentElement.dataset.id;
				state.notes.find((note) => {
					if (note.id === noteId) {
						note.updateText(textArea.value);
					}
				});

				toggleInputArea(textDiv, textArea);
				state.showInput = false;
				resetDom(noteGroup, state);
			}
		});
	};
}

// resets
function resetDom(noteGroup, state) {
	const body = document.querySelector("body");
	noteGroup.innerHTML = "";
	createNoteHTML(noteGroup, state);
	createNewNoteButton(noteGroup);
	deleteBtnEvent();
	editBtnEvent();
	addBtnEvent();
	selectNoteEvent();
	handleClickingOff(body);
}

export {
	selectNoteEvent,
	editBtnEvent,
	deleteBtnEvent,
	addBtnEvent,
	handleClickingOff,
};
