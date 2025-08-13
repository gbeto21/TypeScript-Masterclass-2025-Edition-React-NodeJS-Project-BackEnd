import { Router, type Request, type Response } from "express";
import { TasksController } from "./tasks.controller.js";
import { injectable, inject } from "inversify";
import type { IPartialTaskWithId, ITask } from "./tasks.interface.js";
import { createTaskValidator } from "./validators/createTask.validator.js";
import { validationResult } from "express-validator";
import { getTasksValidator } from "./validators/getTasks.validator.js";
import { StatusCodes } from "http-status-codes";

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      getTasksValidator,
      async (req: Request, res: Response) => {
        const result = validationResult(req);
        const tasks = await this.tasksController.handleGetTasks(req, res);
        res.json(tasks);
      }
    );

    this.router.post(
      "/create",
      createTaskValidator,
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const newTask = await this.tasksController.handlePostTask(req, res);
          res.status(StatusCodes.CREATED).json(newTask);
        } else res.status(StatusCodes.BAD_REQUEST).json(result.array());
      }
    );

    this.router.patch(
      "/update",
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const updatedTask = await this.tasksController.handlePatchTasks(
          req,
          res
        );
        res.status(StatusCodes.OK).json(updatedTask);
      }
    );
  }
}
