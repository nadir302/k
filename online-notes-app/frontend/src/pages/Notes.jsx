import React, { useEffect, useState } from 'react'
import API from '../api'

export default function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editing, setEditing] = useState(null)

  async function load() {
    try {
      const res = await API.get('/notes');
      setNotes(res.data.notes);
    } catch (err) {
      console.error(err);
      alert('Failed to load notes — make sure you are logged in');
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      const res = await API.post('/notes', { title, content });
      setNotes(prev => [res.data.note, ...prev]);
      setTitle(''); setContent('');
    } catch (err) { console.error(err); alert('Create failed'); }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await API.put(`/notes/${editing.id}`, { title, content });
      setNotes(prev => prev.map(n => n.id === res.data.note.id ? res.data.note : n));
      setEditing(null); setTitle(''); setContent('');
    } catch (err) { console.error(err); alert('Update failed'); }
  }

  async function handleDelete(id) {
    if (!confirm('Delete note?')) return;
    try {
      await API.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n.id !== id));
    } catch (err) { console.error(err); alert('Delete failed'); }
  }

  function startEdit(note) {
    setEditing(note);
    setTitle(note.title);
    setContent(note.content);
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
      <form onSubmit={editing ? handleUpdate : handleCreate} className="rounded-lg border bg-white p-6 shadow-sm h-fit">
        <h2 className="mb-4 text-xl font-semibold">{editing ? 'Edit note' : 'Create note'}</h2>
        <div className="mb-3">
          <input className="" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div className="mb-4">
          <textarea className="min-h-[120px]" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
        </div>
        <div className="flex items-center gap-3">
          <button type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && (
            <button type="button" onClick={() => { setEditing(null); setTitle(''); setContent(''); }} className="bg-gray-200 text-gray-800 hover:bg-gray-300">Cancel</button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">My Notes</h2>
        {notes.length === 0 && (
          <div className="rounded-lg border bg-white p-6 text-gray-600">No notes yet. Create your first one!</div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          {notes.map(note => (
            <div key={note.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="text-lg font-medium">{note.title}</h3>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">{note.content}</p>
              <div className="mt-2 text-xs text-gray-500">{new Date(note.updated_at).toLocaleString()}</div>
              <div className="mt-3 flex items-center gap-2">
                <button onClick={() => startEdit(note)} className="bg-amber-500 hover:bg-amber-600">Edit</button>
                <button onClick={() => handleDelete(note.id)} className="bg-rose-600 hover:bg-rose-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
