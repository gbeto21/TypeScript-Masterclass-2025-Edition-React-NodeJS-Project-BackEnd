import { injectable } from "inversify";

@injectable()
export class TasksController {
  constructor() {}

  createTask() {
    return {
      title: "Title of the tasks",
      description: "Description for the description",
    };
  }
}
