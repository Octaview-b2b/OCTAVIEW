import mongoose,{Schema,Document, ObjectId} from "mongoose";

export interface Iuser extends Document{
    email:string;
    password:string;
    companyName:string;
    url:string;
    block:boolean;
    applications:ObjectId;
    jobs:ObjectId
    selectedApplications:ObjectId
}

const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    url: { type: String, required: false },
    block: { type: Boolean, default: false },
    applications: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
    jobs: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    selectedApplications: { type: mongoose.Schema.Types.ObjectId, ref: 'Selected' },
})
export const UserModal =mongoose.model<Iuser>('User',userSchema)