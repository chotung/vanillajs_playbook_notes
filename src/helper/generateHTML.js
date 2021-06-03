function renderNotes(state, noteGroup) {
	return state.notes.forEach((note) => {
		noteGroup.innerHTML += note.generateHTML();
	});
}

function createNewNoteButton(noteGroup) {
	const newNoteButton = document.createElement("div");
	newNoteButton.id = "note_new_ca";
	noteGroup.appendChild(newNoteButton);
	newNoteButton.innerHTML += `<i class ="fas fa-plus"></i>`;
}

export { renderNotes, createNewNoteButton };
