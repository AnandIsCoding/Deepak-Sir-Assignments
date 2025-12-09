import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  content: string;
}

const noteSchema = new Schema<INote>({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const Note = mongoose.model<INote>("Note", noteSchema);
export default Note;
