import express,{Request,Response,NextFunction} from 'express';
import router from './routers';
import { connectDb } from '../infrastructure/data-sources/mongodb/mongodb-contact-data-source';
import dotenv from 'dotenv';
import { initWebSocketServer } from '../infrastructure/websocket/signaling';
import http from 'http';

const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app);
initWebSocketServer(server);

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

app.use(express.json());
app.use('/api', router); 

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1); 
  }
})();


export default app;
