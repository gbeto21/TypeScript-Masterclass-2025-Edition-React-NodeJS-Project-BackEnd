import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller.js";
import { Task } from "./task.schema.js";
import type { IPartialTaskWithId, ITask } from "./tasks.interface.js";
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

  async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ) {
    const task = await Task.findById(req.body._id);
    if (task) {
      task.title = req.body.title ? req.body.title : task.title;
      task.description = req.body.description
        ? req.body.description
        : task.description;
      task.duedate = req.body.duedate ? req.body.duedate : task.duedate;
      task.status = req.body.status ? req.body.status : task.status;
      task.priority = req.body.priority ? req.body.priority : task.priority;

      await task.save();
    }

    return task;
  }
}
