import { Container } from "inversify";
import { User } from "../user.js";
import { Page } from "../page.js";

export const container: Container = new Container();

container.bind(User).toSelf().inSingletonScope(); //example, don't use in production;
container.bind(Page).toSelf().inTransientScope();
