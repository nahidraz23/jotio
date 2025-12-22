import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();

notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find();

    res.status(201).json({
        success: true,
        message: "Notes found!!!",
        notes
    })
})

notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;

    // notesRoutesroach-1 for finding single note
    // const note = await Note.findById(noteId);

    // notesRoutesroach-2 for finding single note
    const note = await Note.findOne({_id : noteId});

    res.status(201).json({
        success: true,
        message: "Notes found!!!",
        note
    })
})

notesRoutes.post('/create-note', async (req: Request, res: Response) => {
    
    const body = req.body;

    // notesRoutesroach-1 of creating note
    // const myNote = new Note ({
    //     // title: 'Learning Mongoose',
    //     // content: 'I am learning Mongoose',
    //     // content: true,
    //     // publishDate: 'Hello World'
        
    // })

    // notesRoutesroach-2
    const note = await Note.create(body)

    // await myNote.save();


    res.status(201).json({
        success: true,
        message: 'Note create successfully',
        note
    })
})

notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true});
    // const note = await Note.findOneAndUpdate({_id: noteId}, updatedBody, {new: true});
    // const note = await Note.updateOne({_id: noteId}, updatedBody, {new: true});

    res.status(201).json({
        success: true,
        message: "Note updated successfully!!!",
        note
    })
})

notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const noteId = req.params.noteId;

    const note = await Note.findByIdAndDelete(noteId);

    res.status(201).json({
        success: true,
        message: "Note deleted successfully!!!",
        note
    })

})