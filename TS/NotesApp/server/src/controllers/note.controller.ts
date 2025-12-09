import { type Request, type Response } from "express";
import chalk from "chalk";
import Note from "../models/note.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

// Create a new note
export const createNoteController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user?.id;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const note = await Note.create({ owner: userId, title, content });

    // Add note reference to user's notes array
    await User.findByIdAndUpdate(userId, { $push: { notes: note._id } });

    return res.status(201).json({ success: true, message: "Note created successfully", note });
  } catch (error) {
    console.error(chalk.bgRed.white("Error in createNoteController → "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all notes for the logged-in user
export const getNotesController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const notes = await Note.find({ owner: userId });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error(chalk.bgRed.white("Error in getNotesController → "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// Update a note
export const updateNoteController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user?.id;
    const noteId = req.params.id;
    const { title, content } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const note = await Note.findOne({ _id: new mongoose.Types.ObjectId(noteId), owner: userId });
   
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();
    return res.status(200).json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    console.error(chalk.bgRed.white("Error in updateNoteController → "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Delete a note
export const deleteNoteController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = (req as any).user?.id;
    const noteId = req.params.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const note = await Note.findOneAndDelete({ _id: new mongoose.Types.ObjectId(noteId), owner: userId });
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Remove note reference from user's notes array
    await User.findByIdAndUpdate(userId, { $pull: { notes: note._id } });

    return res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error(chalk.bgRed.white("Error in deleteNoteController → "), error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
