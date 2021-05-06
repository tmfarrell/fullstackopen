import React, { useState } from 'react'
import Note from './components/Note.js'

const NoteApp = () => {
    const notes_initial = [
          {
            id: 1,
            content: 'HTML is easy',
            date: '2019-05-30T17:30:31.098Z',
            important: true
          },
          {
            id: 2,
            content: 'Browser can execute only JavaScript',
            date: '2019-05-30T18:39:34.091Z',
            important: false
          },
          {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            date: '2019-05-30T19:20:14.298Z',
            important: true
          }
        ]

    const [notes, setNotes] = useState(notes_initial)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
      }

    const addNote = (event) => {
        event.preventDefault()
        const new_note = {
            id: notes.length + 1,
            content: newNote,
            date: Date.now().toString(),
            important: true
        }

        setNotes(notes.concat(new_note))
        setNewNote('')
    }

    return (
        <div>
          <h2 style={{color: "red"}}>Notes</h2>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all' }
            </button>
          </div>
          <ul>
            {notesToShow.map(note =>
              <Note key={note.id} note={note} />
            )}
          </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type="submit">save</button>
          </form>
        </div>
      )
} ;

export default NoteApp;
