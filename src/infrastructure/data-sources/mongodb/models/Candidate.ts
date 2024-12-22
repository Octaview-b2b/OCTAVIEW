import mongoose, { Schema, Document, ObjectId } from "mongoose";


export interface ICandidateModal extends Document {
  _id: string;
  fullName: string;
  DOB: string;  
  linkedin: string;
  resumeUrl: string;
  country: string;
  email: string;
  contactNo: string;  
  status: object;
  github: string;
  selection:boolean
}



const candidateSchema = new Schema(
  {
    fullName: { type: String, required: true },
    DOB: { type: String, required: true },
    linkedin: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    github: { type: String, required: true },
    status:{type :Object},
    resumeUrl: { type: String, required: true },
    selection:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const CandidateModel = mongoose.model('Candidate', candidateSchema);

export default CandidateModel;
