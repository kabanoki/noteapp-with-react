import { useEffect, useState } from 'react'
import './App.css'
import Main from './components/Main'
import Sidebar from './components/Sidebar'
import uuid from 'react-uuid'

function App() {
  const defaultNote = {
      id: 0
  };

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [activeNote, setActiveNote] = useState(defaultNote);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    
  }, [notes])

  useEffect(() => {
    setActiveNote(notes[0] || defaultNote)
  }, [])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title:'',
      content: "",
      creadDate: Date.now(),
      modDate: Date.now()
    };
    setNotes([...notes, newNote])
    setActiveNote(newNote);
  }

  const onDeleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id)
    setNotes(filterNotes);

    if(activeNote.id === id){
      setActiveNote(defaultNote);
    }
  }

  const onUpdateNotes  = (updatedNote) => {
    setNotes(notes.map((note) => {
      if(note.id === activeNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    }));
  }

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
      <Main activeNote={activeNote} setActiveNote={setActiveNote} onUpdateNotes={onUpdateNotes}/>
    </div>
  )
}

export default App
