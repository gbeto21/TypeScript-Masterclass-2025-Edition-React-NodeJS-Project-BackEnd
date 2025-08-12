import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller.js";

export const container: Container = new Container();
container.bind(TasksController).toSelf().inTransientScope();
