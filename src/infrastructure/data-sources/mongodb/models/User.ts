import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  companyName: string;
  url: string;
  block: boolean;
  applications: ObjectId;
  jobs: ObjectId[]; 
  selectedApplications: ObjectId;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  url: { type: String, required: false },
  block: { type: Boolean, default: false },
  applications: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Allow multiple job references
  selectedApplications: { type: mongoose.Schema.Types.ObjectId, ref: "Selected" },
});

export const UserModel = mongoose.model<IUser>("User", userSchema);
