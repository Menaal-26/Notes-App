import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiSearch, FiMoon, FiSun, FiPlus, FiTrash2, FiTag } from 'react-icons/fi';
import './App.css';

function NotesPage() {
  // Initialize state with proper localStorage handling
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('notes');
      return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeNote, setActiveNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState(() => {
    try {
      const savedTags = localStorage.getItem('tags');
      return savedTags ? JSON.parse(savedTags) : ['work', 'personal', 'ideas'];
    } catch (e) {
      return ['work', 'personal', 'ideas'];
    }
  });
  
  const [newTag, setNewTag] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode ? JSON.parse(savedMode) : false;
    } catch (e) {
      return false;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('notes', JSON.stringify(notes));
      localStorage.setItem('tags', JSON.stringify(tags));
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [notes, tags, darkMode]);

  // Note functions
  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: 'Untitled Note',
      content: '',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() } 
        : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote === id) setActiveNote(null);
  };

  // Tag functions
  const addTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  // Filter notes based on search term
  const filteredNotes = notes.filter(note => {
    const searchLower = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower)
    );
  });

  const activeNoteData = notes.find(note => note.id === activeNote);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>🌿 Notes</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-toggle"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

        <div className="search">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={addNote} className="add-note">
          <FiPlus /> New Note
        </button>

        <div className="tags-section">
          <form onSubmit={addTag} className="add-tag">
            <input
              type="text"
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <button type="submit"><FiTag /></button>
          </form>
          <div className="tags-list">
            {tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="notes-list">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className={`note-item ${activeNote === note.id ? 'active' : ''}`}
                onClick={() => setActiveNote(note.id)}
              >
                <h3>{note.title || 'Untitled Note'}</h3>
                <p>{note.content.substring(0, 60)}{note.content.length > 60 ? '...' : ''}</p>
                <div className="note-footer">
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="delete-btn"
                    aria-label="Delete note"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notes">No notes found</div>
          )}
        </div>
      </div>

      {/* Note Editor */}
      <div className="note-editor">
        {activeNoteData ? (
          <>
            <input
              type="text"
              className="note-title"
              value={activeNoteData.title}
              onChange={(e) => updateNote({ ...activeNoteData, title: e.target.value })}
              placeholder="Note Title"
            />
            <textarea
              className="note-content"
              value={activeNoteData.content}
              onChange={(e) => updateNote({ ...activeNoteData, content: e.target.value })}
              placeholder="Write your note here... Markdown supported"
            />
            {activeNoteData.tags.length > 0 && (
              <div className="note-tags">
                {activeNoteData.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}
            <div className="markdown-preview">
              <h3>Preview</h3>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {activeNoteData.content}
              </ReactMarkdown>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>Select a note or create a new one</h2>
            <p>Start by clicking "New Note" or select an existing note from the sidebar.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesPage;