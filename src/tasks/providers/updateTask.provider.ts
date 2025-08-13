import { inject, injectable } from "inversify";
import type { IPartialTaskWithId, ITask } from "../tasks.interface.js";
import { TaskService } from "../tasks.service.js";
import type { Document } from "mongoose";

@injectable()
export class UpdateTaskProvider {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  async updateTask(update: IPartialTaskWithId): Promise<Document | never> {
    const task: (Document & ITask) | null = await this.taskService.findById(
      update._id
    );
    if (!task) {
      throw new Error("Task does not exist");
    }

    task.title = update.title ? update.title : task.title;
    task.description = update.description
      ? update.description
      : task.description;
    task.duedate = update.duedate ? update.duedate : task.duedate;
    task.status = update.status ? update.status : task.status;
    task.priority = update.priority ? update.priority : task.priority;

    return await task.save();
  }
}
