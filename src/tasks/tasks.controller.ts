import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller.js";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  handleGetTasks() {
    return [
      {
        title: "Title of the tasks",
        description: "Description for the description",
      },
    ];
  }

  handlePostTask() {
    console.log("🎖️ Log: ", this.userController.getUser());

    return {
      title: "Title of the tasks",
      description: "Description for the description",
    };
  }

  handlePatchTasks() {
    return {
      title: "Title of the tasks",
      description: "Description for the description",
    };
  }
}
