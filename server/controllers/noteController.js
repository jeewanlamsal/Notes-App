const Note = require('../models/Note');

const getNotes=async(req,res)=>{
    try{
        const notes= (await Note.find()).toSorted({ createdAt: -1});
        // note.find() finds out the file/ notes asked by client by shorting it in created date.
        res.json(notes);
        //return to user in json format
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

const createNote = async (req, res) => {
    try {
        const { text } = req.body;
        //it receive text coming from the request body.
        if (!text) return res.status(400).json({ error: 'Text is required' });
     //meaning: If there is no text provided, stop here and send a 400 Bad Request response.
        const note = new Note({ text });
        //Create a new instance of your Mongoose model (Note).
        await note.save();
        //save new created file in mongoodb
        res.status(201).json(note);
        //send response to the client as created successfully.
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc   Update note
// @route  PUT /api/notes/:id
const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        //search file by its lication/id 
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc   Delete note
// @route  DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getNotes, createNote, updateNote, deleteNote };