import express, {Application, Request, Response} from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

app.use(express.json())

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
    },
    tags: {
        label: {type: String, required: true},
        color: {type: String, default: 'gray'}
    }
})

const Note = model('Note', noteSchema)

app.get('/notes', async (req: Request, res: Response) => {
    const notes = await Note.find();

    res.status(201).json({
        success: true,
        message: "Notes found!!!",
        notes
    })
})

app.get('/notes/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;

    // approach-1 for finding single note
    // const note = await Note.findById(noteId);

    // approach-2 for finding single note
    const note = await Note.findOne({_id : noteId});

    res.status(201).json({
        success: true,
        message: "Notes found!!!",
        note
    })
})

app.post('/notes/create-note', async (req: Request, res: Response) => {
    
    const body = req.body;

    // approach-1 of creating note
    // const myNote = new Note ({
    //     // title: 'Learning Mongoose',
    //     // content: 'I am learning Mongoose',
    //     // content: true,
    //     // publishDate: 'Hello World'
        
    // })

    // approach-2
    const note = await Note.create(body)

    // await myNote.save();


    res.status(201).json({
        success: true,
        message: 'Note create successfully',
        note
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to Jotio. The ultimate note taking application.")
})

export default app;