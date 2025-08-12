import "reflect-metadata";
import express from "express";
import type { Request, Response, Express } from "express";
import { Page } from "./src/page.js";
import { container } from "./src/config/container.js";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

const pageClass = container.get<Page>(Page);

app.post("/create-page", (req: Request, res: Response) => {
  const page = pageClass.createPage("http://mypage.com");
  res.json(page);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
