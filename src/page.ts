import { injectable, inject } from "inversify";
import { User } from "./user.js";

@injectable()
export class Page {
  constructor(@inject(User) private user: User) {}
  /**
   * createPage
   */
  public createPage(url: string) {
    return {
      pageUrl: url,
      user: this.user,
    };
  }
}
