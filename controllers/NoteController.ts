import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createNote = async (req: Request, res: Response) => {
    try {
        // get header request
        const token = req.headers.authorization;
        // get token
        const tokenSplit = token.split(' ');
        // get token
        const tokenValue = tokenSplit[1];
        
        //  check token in database
        const user = await prisma.client_credentials.findFirst({
            where: {
                token: tokenValue,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // serialize a big integer
        const userId = Number(user.tokenable_id);

        // Extract the note data from the request body
        const { title, content } = req.body;

        // Create the note in the database
        const note = await prisma.note.create({
            data: {
                title,
                note: content,
                user_id: userId,
            },
        });

        res.status(201).json({ 
            message: 'Note created successfully',
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to create note',
            message: error.message,
        });
    }
};

export const getNote = async (req: Request, res: Response) => {
    try {
        // get header request
        const token = req.headers.authorization;
        // get token
        const tokenSplit = token.split(' ');
        // get token
        const tokenValue = tokenSplit[1];
        
        //  check token in database
        const user = await prisma.client_credentials.findFirst({
            where: {
                token: tokenValue,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // serialize a big integer
        const userId = Number(user.tokenable_id);

        // get all notes from the database
        const notes = await prisma.note.findMany({
            where: {
                user_id: userId,
            },
        });

        res.status(200).json({ 
            status: 'success',
            data: notes,
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to get note',
            message: error.message,
        });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        // get header request
        const token = req.headers.authorization;
        // get token
        const tokenSplit = token.split(' ');
        // get token
        const tokenValue = tokenSplit[1];
        
        //  check token in database
        const user = await prisma.client_credentials.findFirst({
            where: {
                token: tokenValue,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // serialize a big integer
        const userId = Number(user.tokenable_id);

        // update the note in the database
        const note = await prisma.note.update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                title: req.body.title,
                note: req.body.content,
            },
        });



        res.status(202).json({ 
            message: 'Note updated successfully',
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to get note',
            message: error.message,
        });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        // get header request
        const token = req.headers.authorization;
        // get token
        const tokenSplit = token.split(' ');
        // get token
        const tokenValue = tokenSplit[1];
        
        //  check token in database
        const user = await prisma.client_credentials.findFirst({
            where: {
                token: tokenValue,
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // serialize a big integer
        const userId = Number(user.tokenable_id);

        // check if the note exists in the database
        const note = await prisma.note.findFirst({
            where: {
                id: Number(req.params.id),
            },
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // delete the note in the database
        await prisma.note.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.status(201).json({ 
            message: 'Note deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to delete note',
            message: error.message,
        });
    }
};