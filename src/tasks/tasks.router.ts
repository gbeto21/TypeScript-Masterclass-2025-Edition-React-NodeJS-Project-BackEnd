import { Router, type Request, type Response } from "express";
import { TasksController } from "./tasks.controller.js";
import { injectable, inject } from "inversify";

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
    this.router.post("/create", (req: Request, res: Response) => {
      const newTask = this.tasksController.createTask();
      res.json(newTask);
    });
  }
}
