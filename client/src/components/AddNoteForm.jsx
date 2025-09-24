import React, { useState } from "react";
import api from "../services/api";

export default function AddNoteForm({ onAddNote }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await api.post("/notes", { text }); // POST /api/notes
      onAddNote(res.data); // update parent state
      setText(""); // clear input
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note..."
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-900 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}
