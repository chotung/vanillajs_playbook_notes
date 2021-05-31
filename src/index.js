import _, { add } from "lodash";
import Note from "./components/Note";
import qs from "./helper/qs";
import { v4 as uuidv4 } from "uuid";

import "./style/index.css";
import "./style/App.css";

const body = document.querySelector("body");

/**
 * 			selected: false,
			color: color,
			btnColor: " #FCFE7D",
 */

const notes = [
	{
		id: uuidv4(),
	},
	{
		id: uuidv4(),
	},
	{
		id: uuidv4(),
	},
	{
		id: uuidv4(),
	},
	{
		id: uuidv4(),
	},
	{
		id: uuidv4(),
	},
];

/**
 * 		backgroundColor: color,
		border: isSelected ? "3px solid #0198E1" : "none",
		width: "100%",
		minHeight: "18rem",
		backgroundClip: "content-box",
		padding: "4px",
		display: "flex",
		flexDirection: "column",
 * 
 * 
 * 
 */

function intialize() {
	body.innerHTML = `<div class="App"><div class="note_group"></div></div>`;
	const noteGroup = qs(".note_group");
	addNote(noteGroup);
}

function addNote(noteGroup) {
	notes.forEach((note) => {
		noteGroup.innerHTML += `<div class="note">
			<article class="button_group">
				<span class="button left_button_group">
					<span class="button btn_edit">
						edit
					</span>
				</span>
				<span class="button btn_delete">
					delete
				</span>
			</article>
			<div class="text_body">
				<div class="text>
				</div>
			</div>
		</div>`;
	});
}

/*
	const allNotes = document.querySelectorAll(".note");
	allNotes.forEach((note) => {
		note.addEventListener("click", function () {
			console.log("clicking");
		});
	});
*/

document.addEventListener("DOMContentLoaded", intialize);
