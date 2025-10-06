import express from 'express';
import { authenticate } from '../middleware/auth.js';
import * as noteModel from '../models/noteModel.js';

const router = express.Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const notes = await noteModel.getNotesByUser(req.user.id);
    res.json({ notes });
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const note = await noteModel.createNote({ userId: req.user.id, title, content });
    res.status(201).json({ note });
  } catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updated = await noteModel.updateNote({ id, userId: req.user.id, title, content });
    if (!updated) return res.status(404).json({ message: 'Note not found' });
    res.json({ note: updated });
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await noteModel.deleteNote({ id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Note not found' });
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
