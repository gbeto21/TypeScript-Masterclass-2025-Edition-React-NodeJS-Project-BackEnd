import { Router, type Request, type Response } from "express";
import { TasksController } from "./tasks.controller.js";
import { injectable, inject } from "inversify";
import type { IPartialTaskWithId, ITask } from "./tasks.interface.js";
import { createTaskValidator } from "./validators/createTask.validator.js";
import { validationResult } from "express-validator";
import { getTasksValidator } from "./validators/getTasks.validator.js";
import { StatusCodes } from "http-status-codes";
import { updateTaskValidator } from "./validators/updateTask.validator.js";

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
        if (result.isEmpty()) {
          const allTasks = await this.tasksController.handleGetTasks(req, res);
          res.status(StatusCodes.OK).json(allTasks);
        } else res.status(StatusCodes.BAD_REQUEST).json(result.array());
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
      updateTaskValidator,
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const updatedTask = await this.tasksController.handlePatchTasks(
            req,
            res
          );
          res.status(StatusCodes.OK).json(updatedTask);
        } else res.status(StatusCodes.BAD_REQUEST).json();
      }
    );
  }
}
