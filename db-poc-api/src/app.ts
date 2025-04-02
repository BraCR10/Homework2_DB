import express, { Request, Response } from "express";
import cors from "cors";
import { initConnection } from "./config/db.config";
import Router from "./routes";

const app = express();

//TODO: Add the allowed origins to the corsdata array
const corsdata = [
  "http://localhost:3001",
  "https://employeesapp-gamma.vercel.app",
];

const corsOptions = {
  origin: "https://employeesapp-gamma.vercel.app",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", Router);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initConnection();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error details: ", error);
    process.exit(1);
  }
};

startServer();
