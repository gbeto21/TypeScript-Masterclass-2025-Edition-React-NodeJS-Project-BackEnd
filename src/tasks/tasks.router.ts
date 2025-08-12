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
    this.router.get("/", (req: Request, res: Response) => {
      const tasks = this.tasksController.handleGetTasks();
      res.json(tasks);
    });

    this.router.post("/create", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePostTask();
      res.json(newTask);
    });

    this.router.patch("/update", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTasks();
      res.json(newTask);
    });
  }
}
