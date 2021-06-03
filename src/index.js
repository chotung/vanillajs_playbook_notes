import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import Note from "./components/Note";
import "./style/index.css";
import "./style/App.css";
import { renderDOM } from "./helper/events";

library.add(faEdit, faTimes, faPlus);
dom.watch();

function intialize() {
	const state = {
		notes: Array.from(new Array(6), (x, index) => {
			return new Note(index);
		}),
		clicked: new Set(),
		editMode: false,
		prevNote: {},
	};

	const body = document.querySelector("body");
	body.innerHTML = `<div class="App"><div class="note_group"></div></div>`;
	const noteGroup = document.querySelector(".note_group");

	renderDOM(state, noteGroup);
}

document.addEventListener("DOMContentLoaded", intialize);
