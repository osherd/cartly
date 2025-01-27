import express from 'express';
import dotenv from 'dotenv';

import productRouter from "./routes/productRoute";

dotenv.config();

const PORT = process.env.catalog_service_port;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRouter)
app.listen(PORT, () => {
  console.log(` Catalog Server is running on port:${PORT}`);
});