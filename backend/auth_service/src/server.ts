import express from "express";
import cors from 'cors'

import userRouter from "./routes/userRoutes";

const PORT = process.env.AUTH_SERVICE_PORT;;
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.listen(PORT, () => { console.log(`Server Listening on port ${PORT}`) });


















