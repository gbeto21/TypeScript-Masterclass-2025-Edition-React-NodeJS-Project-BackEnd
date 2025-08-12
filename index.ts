import "reflect-metadata";
import express from "express";
import type { Request, Response, Express } from "express";
import { container } from "./src/config/container.js";
import { TasksController } from "./src/tasks/tasks.controller.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

const task = container.get<TasksController>(TasksController);
app.post("/tasks", (req: Request, res: Response) => {
  const newTask = task.createTask();
  res.json(newTask);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
