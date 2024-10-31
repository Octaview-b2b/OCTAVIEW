import express from 'express';
import router from './routers';
import { connectDb } from '../infrastructure/data-sources/mongodb/mongodb-contact-data-source';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

const startServer = async () => {
  await connectDb(); 
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

export default app;
