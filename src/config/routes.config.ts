import type { Application } from "express";
import { container } from "./container.js";
import { TasksRouter } from "../tasks/tasks.router.js";

export function addRoutes(app: Application): Application {
  const tasksRouter = container.get<TasksRouter>(TasksRouter);
  app.use("/tasks", tasksRouter.router);

  return app;
}
