import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id:string;
  email: string;
  password: string;
  companyName: string;
  url: string;
  block: boolean;
  jobs: ObjectId[]; 
  selectedApplications: ObjectId;
  apiToken: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  url: { type: String, required: false },
  block: { type: Boolean, default: false },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }], // Allow multiple job references
  selectedApplications: { type: mongoose.Schema.Types.ObjectId, ref: "Selected" },
  apiToken: { type: String ,default:'weoiqfpwpokspksdoi2189789u23123' },

});

export const UserModel = mongoose.model<IUser>("User", userSchema);
