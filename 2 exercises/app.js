class Note {
    constructor(id, description, status = false) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    toggleStatus() {
        this.status = !this.status;
    }
}

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.loadNotes();
    }

    addNote(description) {
        const id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
        const note = new Note(id, description);
        this.notes.push(note);
        this.saveNotes();
        this.renderNotes();
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        this.renderNotes();
    }

    editNote(id, newDescription) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.description = newDescription;
            this.saveNotes();
            this.renderNotes();
        }
    }

    toggleNoteComplete(id) {
        const note = this.notes.find(note => note.id === id);
        if (note) {
            note.toggleStatus(); // Toggle status
            this.saveNotes();
            this.renderNotes();
        }
    }

    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notes = notes.map(note => new Note(note.id, note.description, note.status));
        this.renderNotes();
    }

    renderNotes() {
        const noteList = document.getElementById('note-list');
        noteList.innerHTML = '';
        this.notes.forEach(note => {
            const item = document.createElement('li');
            const p = document.createElement('p');
            p.textContent = note.description;
            item.appendChild(p);
            const labelCheckBox = document.createElement('label');
            labelCheckBox.textContent = 'Mark as important';
            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            item.appendChild(labelCheckBox);
            item.appendChild(checkBox);
            item.className = note.status ? 'important' : '';
            if (item.className === 'important') {
                p.style.color = 'green';
                labelCheckBox.textContent = 'highlighted note';
                labelCheckBox.style.color = 'green'
            } else {
                p.style.color = '';
            }

            checkBox.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNoteComplete(note.id);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'EDIT';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const newDescriptionNote = prompt("Please enter the new description");
                if (newDescriptionNote === null || newDescriptionNote === "") {
                    alert('Please enter a valid description');
                    return;
                }
                this.editNote(note.id, newDescriptionNote);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'DELETE';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteNote(note.id);
            });

            item.appendChild(editButton);
            item.appendChild(deleteButton);
            noteList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();
    document.getElementById('add-note').addEventListener('click', () => {
        const newNote = document.getElementById('new-note').value;
        if (newNote) {
            noteManager.addNote(newNote);
            document.getElementById('new-note').value = '';
        }
    });
});
