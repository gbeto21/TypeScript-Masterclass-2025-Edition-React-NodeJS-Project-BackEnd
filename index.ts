import "reflect-metadata";
import express from "express";
import type { Express } from "express";
import { addRoutes } from "./src/config/routes.config.js";

const app: Express = express();
const port = 3001;
addRoutes(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
