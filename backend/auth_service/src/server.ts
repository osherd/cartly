import express from "express";
import cors from 'cors'



import userRouter from "./routes/userRoutes";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.listen(PORT, () => { console.log(`Server Listening on port ${PORT}`) });

















// import express from "express";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import userRoute from './routes/userRoutes';

// dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;
// const PORT = process.env.PORT;
// const app = express();

// const corsOptions = {
//   origin: '*',
//   credentials: true,//access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions)); // Use this after the variable declaration

// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: ["http://localhost:4000", " http://127.0.0.1:5173"],
//     credentials: true,
//   })
// );

// // Error middleWare
// // app.use(errorHandler);

// // Routes Middleware
// app.use("/auth/users", userRoute);
// // Routes
// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

















