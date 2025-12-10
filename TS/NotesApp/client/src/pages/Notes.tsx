import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Notes() {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;

  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState<string | null>(null);

  // Fetch all notes
  const loadNotes = async () => {
    try {
      const res = await api.get("/notes/getnotes");
      if (res.data.success) {
        setNotes(res.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Verify login & load notes
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    loadNotes();
  }, []);

  // Handle create / update
  const saveNote = async () => {
    if (!form.title || !form.content) return;

    try {
      if (editId) {
        // update note
        const res = await api.put(`/notes/update/${editId}`, form);
        if (res.data.success) {
          loadNotes();
          setEditId(null);
        }
      } else {
        // create note
        const res = await api.post("/notes/create", form);
        if (res.data.success) loadNotes();
      }
    } catch (err) {
      console.log(err);
    }

    setForm({ title: "", content: "" });
  };

  // Delete note
  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/delete/${id}`);
      loadNotes();
    } catch (err) {
      console.log(err);
    }
  };

  // Set note in edit mode
  const startEdit = (note: any) => {
    setEditId(note._id);
    setForm({ title: note.title, content: note.content });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold tracking-wide">📝 Your Notes</h1>
        <h2 className="text-xl text-gray-300">Hi, {user?.name}</h2>
      </div>

      {/* Create / Update Note Form */}
      <div className="bg-gray-800 p-6 rounded-xl mb-10 shadow-md border border-gray-700">
        <h2 className="text-2xl mb-4 font-medium">
          {editId ? "Edit Note" : "Create Note"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 border border-gray-600 outline-none"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Content"
          className="w-full mb-3 p-3 rounded-md bg-gray-700 border border-gray-600 outline-none h-28"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>

        <button
          onClick={saveNote}
          className="px-6 py-3 rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600 transition-all font-medium"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>

        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({ title: "", content: "" });
            }}
            className="ml-3 px-6 py-3 cursor-pointer rounded-md bg-gray-600 hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Notes List */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {notes.length === 0 ? (
          <p className="text-gray-400">No notes yet. Create one above.</p>
        ) : (
          notes.map((note: any) => (
            <div
              key={note._id}
              className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-md relative"
            >
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-300 mb-4">{note.content}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(note)}
                  className="px-4 py-2 bg-green-500 cursor-pointer rounded-md hover:bg-green-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="px-4 py-2 bg-red-500 cursor-pointer rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;
