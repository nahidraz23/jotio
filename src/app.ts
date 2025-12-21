import express, {Application, Request, Response} from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

const noteSchema = new Schema({
    // title: String,
    title: {type: String, required: true, trim: true}, // trim will remove extra white spaces "           Hello World        "
    // content: String,
    content: {type: String, default: ''},
    // publishDate: Number,
    category: {
        type: String,
        enum: ['personal', 'work', 'study', 'other'],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    }
})

const Note = model('Note', noteSchema)

app.post('/create-note', async (req: Request, res: Response) => {
    const myNote = new Note ({
        title: 'Learning Mongoose',
        // content: 'I am learning Mongoose',
        // content: true,
        // publishDate: 'Hello World'
        
    })

    await myNote.save();

    res.status(201).json({
        success: true,
        message: 'Note create successfully',
        note: myNote
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Jotio. The ultimate note taking application.")
})

export default app;