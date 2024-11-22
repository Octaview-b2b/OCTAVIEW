import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  job_title: string;
  skills: string[];
  job_role: string;
  type: string;
  min_salary: number;
  max_salary: number;
  job_level: string;
  location: string;
  city: string;
  description: string;
  hidden: boolean;
}

const JobSchema: Schema = new Schema({
  job_title: { type: String, required: true },
  skills: { type: [String], required: true },
  job_role: { type: String, required: true },
  min_salary: { type: Number, required: true },
  max_salary: { type: Number, required: true },
  job_level: { type: String, required: true },
  location: { type: String, required: true },
  type:{type: String,require:true},
  city: { type: String, required: true },
  description: { type: String, required: true },
  hidden: { type: Boolean, default: false },
});

export const JobModel = mongoose.model<IJob>("Job", JobSchema);
