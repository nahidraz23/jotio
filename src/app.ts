import express, {Application, Request, Response} from 'express';
import { Note } from './app/models/notes.model';
import { notesRoutes } from './app/controllers/notes.controller';

const app: Application = express();

app.use(express.json());

app.use('/notes', notesRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Jotio. The ultimate note taking application.")
})

export default app;