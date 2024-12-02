import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserService } from "./services";
import { inject } from "inversify";
import type { Request, Response } from "express";
import { JWT } from "../jwt";

@controller("/users")
export class UserController {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  @httpGet("/index", JWT.middleware())
  public async getIndex(req: Request, res: Response) {
    let result = await this.userService.getList();
    res.send(result);
  }

  @httpPost("/create")
  public async create(req: Request, res: Response) {
    let result = await this.userService.createUser(req.body);
    res.send(result);
  }
}
