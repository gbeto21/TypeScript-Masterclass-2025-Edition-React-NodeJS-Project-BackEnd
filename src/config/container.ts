import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller.js";
import { TasksRouter } from "../tasks/tasks.router.js";
import { UserController } from "../user/user.controller.js";

export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(UserController).toSelf().inTransientScope();
