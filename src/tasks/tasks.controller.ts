import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller.js";
import type { IPartialTaskWithId, ITask } from "./tasks.interface.js";
import type { Request, Response } from "express";
import type { Document } from "mongoose";
import { TaskService } from "./tasks.service.js";
import { UpdateTaskProvider } from "./providers/updateTask.provider.js";
import { matchedData } from "express-validator";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider
  ) {}

  async handleGetTasks(req: Request, res: Response) {
    const tasks = await this.taskService.findAll();
    return tasks;
  }

  async handlePostTask(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> =
      await this.taskService.createTask(req.body);
    await task.save();
    return task;
  }

  async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialTaskWithId = matchedData(req);
    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
