import { inject, injectable } from "inversify";
import { TaskService } from "../tasks.service.js";
import type { ITaskPagination } from "../interfaces/taskPagination.interface.js";
import type { ITask } from "../tasks.interface.js";

@injectable()
export class GetTasksProvider {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  async findAllTasks(pagination: Partial<ITaskPagination>) {
    const tasks: ITask[] = await this.taskService.findActive({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? "asc",
    });
  }
}
