import React, { useState } from "react";
import api from "../services/api";

export default function NoteCard({ note, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`); // DELETE /api/notes/:id
      onDelete(note._id);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await api.put(`/notes/${note._id}`, { text: editText }); // PUT /api/notes/:id
      onUpdate(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded hover:shadow-lg transition duration-300">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-600 text-white px-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-2 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{note.text}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-2 rounded"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
