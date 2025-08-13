import "reflect-metadata";
import express from "express";
import type { Express } from "express";
import { addRoutes } from "./src/config/routes.config.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware.js";
import cors, { type CorsOptions } from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// let corsOptions: CorsOptions = {
//   origin:"http://example.com"
// }
// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(responseFormatter);

addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
    throw new Error("Cannot read environment variables");
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("🪴 Connected to mongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`💥 Error: ${error}`);
    process.exit(1);
  }
}

bootstrap();
