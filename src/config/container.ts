import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller.js";
import { TasksRouter } from "../tasks/tasks.router.js";
import { UserController } from "../user/user.controller.js";
import { TaskService } from "../tasks/tasks.service.js";
import { UpdateTaskProvider } from "../tasks/providers/updateTask.provider.js";
import { GetTasksProvider } from "../tasks/providers/getTasks.provider.js";

export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inTransientScope();
container.bind(UpdateTaskProvider).toSelf().inTransientScope();
container.bind(GetTasksProvider).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();
