import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import authRouter from "../router/Auth";
import noteRouter from "../router/Note";
import bodyParser from 'body-parser';
import cors from 'cors';

const prisma    = new PrismaClient();
const app       = express();
const PORT      = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api/note", noteRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Say Hello!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});