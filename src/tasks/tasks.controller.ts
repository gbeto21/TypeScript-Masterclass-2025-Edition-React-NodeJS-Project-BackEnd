import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller.js";
import { Task } from "./task.schema.js";
import type { ITask } from "./tasks.interface.js";
import type { Request, Response } from "express";
import type { Document } from "mongoose";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  async handleGetTasks(req: Request, res: Response) {
    const tasks = await Task.find();
    return tasks;
  }

  async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = new Task(req.body);
    await task.save();
    return task;
  }

  handlePatchTasks() {
    return {
      title: "Title of the tasks",
      description: "Description for the description",
    };
  }
}
