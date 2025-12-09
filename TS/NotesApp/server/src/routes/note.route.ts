import { Router } from "express";
import {
  createNoteController,
  getNotesController,
  updateNoteController,
  deleteNoteController,
} from "../controllers/note.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // middleware to check JWT

const notesRouter = Router();

// Protect all routes with authMiddleware
notesRouter.use(authMiddleware);

// Create a new note
notesRouter.post("/create", createNoteController);

// Get all notes of logged-in user
notesRouter.get("/getnotes", getNotesController);

// Update a note
notesRouter.put("/update/:id", updateNoteController);

// Delete a note
notesRouter.delete("delate/:id", deleteNoteController);

export default notesRouter ;
