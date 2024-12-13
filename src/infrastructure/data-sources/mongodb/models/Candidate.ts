import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface ICandidate extends Document {
  _id: string;
  full_Name: string;
  DOB: Date;
  linkedin: string;
  resumeUrl: string;
  country: string;
  email: string;
  contact_no: number;
  status: object;
  github: string;
}

const candidateSchema: Schema = new Schema({
  full_Name: { type: String, required: true },
  DOB: { type: Date, required: true },
  linkedin: { type: String, required: true },
  profile: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: Number, required: true },
  status: { type: Object, required: true },
  github: { type: String, required: true },
  resumeUrl:{type:String,required:true}
});

export const CandidateModel = mongoose.model<ICandidate>("Candidate", candidateSchema);
