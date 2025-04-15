import express, { Request, Response } from "express";
import cors from "cors";
import { initConnection } from "./config/db.config";
import Router from "./routes";

const app = express();
export const Mock = true;


const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3000',
  'https:/domain.com'
];
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v2", Router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initConnection();
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}/api/v2`);
    });
  } catch (error) {
    console.error("Error details: ", error);
    process.exit(1);
  }
};

startServer();
