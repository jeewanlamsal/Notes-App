import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddNoteForm from "../components/AddNoteForm";
import NoteCard from "../components/NoteCard";
import api from "../services/api"; // Axios instance pointing to backend

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes"); // GET /api/notes
        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Add a new note
  const handleAddNote = (note) => {
    setNotes([note, ...notes]); // prepend new note
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note._id !== id));
  };

  // Update a note
  const handleUpdateNote = (updatedNote) => {
    setNotes(
      notes.map((note) => (note._id === updatedNote._id ? updatedNote : note))
    );
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="p-4 text-center">Loading notes...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <AddNoteForm onAddNote={handleAddNote} />
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">No notes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
