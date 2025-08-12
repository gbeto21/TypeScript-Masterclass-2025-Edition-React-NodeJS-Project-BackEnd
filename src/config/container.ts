import { Container } from "inversify";
import { User } from "../user.js";
import { Page } from "../page.js";

export const container: Container = new Container();

container.bind(User).toSelf();
container.bind(Page).toSelf();
