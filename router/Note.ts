import express, { Request, Response } from 'express';
import { createNote, getNote, updateNote, deleteNote } from '../controllers/NoteController';

const router = express.Router();

// Create a new note
router.post('/create', async (req: Request, res: Response) => {
    const note = await createNote(req, res);
    res.status(201).json(note);
});

// Get a specific note
router.get('/get', async (req: Request, res: Response) => {
    const note = await getNote(req, res);
    res.json(note);
});

// Update a note
router.put('/update/:id', async (req: Request, res: Response) => {
    const note = await updateNote(req, res);
    res.json(note);
});

// Delete a note
router.delete('/delete/:id', async (req: Request, res: Response) => {
    const note = await deleteNote(req, res);
    res.json(note);
});

export default router;