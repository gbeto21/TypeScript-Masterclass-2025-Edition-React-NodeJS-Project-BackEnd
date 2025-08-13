import { injectable } from "inversify";
import { Task } from "./task.schema.js";
import { Model } from "mongoose";
import type { ITask } from "./tasks.interface.js";
import type { ITaskPagination } from "./interfaces/taskPagination.interface.js";

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save();
  }

  async findById(_id: string) {
    return await this.taskModel.findById(_id);
  }

  async findActive(pagination: ITaskPagination) {
    return await this.taskModel
      .find({ status: { $in: ["todo", "inProgress"] } })
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({ createdAt: pagination.order == "asc" ? 1 : -1 });
  }

  async findAll(pagination: ITaskPagination) {
    return await this.taskModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page - 1)
      .sort({ createdAt: pagination.order == "asc" ? 1 : -1 });
  }
}
