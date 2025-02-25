import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { ICandidateModal } from "./Candidate";

export interface ISelectedCandidate extends Document {
    candidate: ObjectId | ICandidateModal;
    job: ObjectId;
    date: string ;
    time: string;
    report: string;
    status: "scheduled"|"hired" | "rejected" | "onhold";
}

const selectedCandidateSchema: Schema = new Schema(
    {
        candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
        date: { type: String },
        time: { type: String }, 
        report: { type: String },
        status: { 
            type: String, 
            enum: ["scheduled","hired", "rejected", "onhold"], 
        },
    },
    { timestamps: true }
);

const SelectedCandidateModel = mongoose.model<ISelectedCandidate>("SelectedCandidate", selectedCandidateSchema);

export default SelectedCandidateModel;