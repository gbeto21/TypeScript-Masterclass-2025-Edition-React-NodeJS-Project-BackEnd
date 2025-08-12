import "reflect-metadata";
import express from "express";
import type { Request, Response, Express } from "express";
import { Page } from "./src/page.js";
import { User } from "./src/user.js";
import { Post } from "./src/post.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

app.post("/create-post", (req: Request, res: Response) => {
  const post = new Post("New Post", "Post Content", new User("John"));
  res.send("Post created");
});

app.post("/create-page", (req: Request, res: Response) => {
  let post = new Page("http://page.com", new User("John"));
  res.send("Page created");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
