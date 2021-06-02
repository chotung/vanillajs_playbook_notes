import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./components/Note";
import "./style/index.css";
import "./style/App.css";
import {
	selectNoteEvent,
	editBtnEvent,
	deleteBtnEvent,
	addBtnEvent,
	handleClickingOff,
} from "./helper/events";
import { createNoteHTML, createNewNoteButton } from "./helper/generateHTML";

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
	createNoteHTML(noteGroup, state);
	createNewNoteButton(noteGroup);
	deleteBtnEvent(state);
	editBtnEvent(state);
	addBtnEvent(state);
	selectNoteEvent(state);
	handleClickingOff(body, state);
}

document.addEventListener("DOMContentLoaded", intialize);
