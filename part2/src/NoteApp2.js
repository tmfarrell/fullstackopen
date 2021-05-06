import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const NoteApp2 = () => {
  const [notes, setNotes] = useState([])
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

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

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

export default NoteApp2 ;
