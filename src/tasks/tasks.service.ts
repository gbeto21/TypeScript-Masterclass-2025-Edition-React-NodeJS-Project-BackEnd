import { injectable } from "inversify";
import { Task } from "./task.schema.js";
import { Model } from "mongoose";
import type { ITask } from "./tasks.interface.js";

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save();
  }

  async findById(_id: string) {
    return await this.taskModel.findById(_id);
  }

  async findAll() {
    return await this.taskModel.find();
  }
}
