import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from 'process';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
                email,
            },
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(req);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await prisma.users.findUnique({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // store data token in database
        await prisma.client_credentials.create({
            data: {
                tokenable_id: user.id,
                tokenable_type: 'users',
                token: token,
                name: 'login',
                expiresAt: new Date(new Date().getTime() + 60 * 60 * 1000),
                abilities: "[*}",
                last_used_at: new Date(),
            },
        });

        // Send the JWT token in the response
        res.json({
            message: 'Login successful',
            data : {
                username: user.username,
                email: user.email,
            },
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};