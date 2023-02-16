import React from 'react'
import "./Main.css";
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

const Main = ({ activeNote, setActiveNote, onUpdateNotes }) => {

    const onEditNote  = (key, value) => {
        const updatedNote = {
            ...activeNote,
            [key]: value,
            modDate: Date.now() 
        }
        setActiveNote(updatedNote);
        onUpdateNotes(updatedNote);
    }

    if(activeNote.id === 0) {
        return <div className='no-active-note'>ノートが選択されていません。</div>
    }

    return (
        <div className='app-main'>
            <div className='app-main-note-edit'>
                <input 
                    id="title" 
                    type="text" 
                    placeholder='タイトルを記入'
                    value={activeNote.title} 
                    onChange={(e) => {onEditNote('title', e.target.value)}} />

                <textarea 
                    id="content"
                    placeholder='内容を記入'
                    value={activeNote.content}
                    onChange={(e) => {onEditNote('content', e.target.value)}}></textarea>
            </div>
            <div className='app-main-note-preview'>
                <h1 className='preview-title'>{activeNote.title}</h1>
                <ReactMarkdown className='markdown-preview'>{activeNote.content}</ReactMarkdown>
            </div>
        </div>
    )
}

export default Main