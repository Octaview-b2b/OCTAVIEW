import mongoose from 'mongoose';
import { MONGO_URI } from '../../../config/env';


export const connectDb = async()=>{
    try {
        const con = await mongoose.connect(MONGO_URI)
        console.log(`db connected :${con.connection.host}`);
    } catch (error) {
        console.error(`ERROR : ${error}`)
        process.exit(1)
    }
}