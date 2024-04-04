import express, { Router, Request, Response } from 'express';
import { login, register } from '../controllers/AuthController';

const router: Router = express.Router();

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
    try {
        const result = await register(req, res);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route for user authentication
router.post('/login', async (req: Request, res: Response) => {
    try {
        const result = await login(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Route for user logout
router.post('/logout', async (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;