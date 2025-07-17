import express from "express";
import cors from 'cors'

import userRouter from "./routes/userRoutes";

const PORT = process.env.AUTH_SERVICE_PORT;;
const app = express();
app.use(express.json());
app.use(cors());
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(userRouter);
app.listen(PORT, () => { console.log(`Auth server Listening on port ${PORT}`) });


















