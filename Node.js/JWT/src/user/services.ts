import { injectable, inject } from "inversify";
import { PrismaDB } from "../db";

import { UserDto } from "./user.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { JWT } from "../jwt";

@injectable()
export class UserService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
    @inject(JWT) private readonly JWT: JWT
  ) {}

  public async getList() {
    return await this.PrismaDB.prisma.user.findMany();
  }

  public async createUser(user: UserDto) {
    const userDto = plainToClass(UserDto, user);

    const errors = await validate(userDto);
    if (errors.length > 0) {
      return errors;
    }
    console.log(userDto);

    const res = await this.PrismaDB.prisma.user.create({
      data: userDto,
    });

    return {
      ...res,
      token: this.JWT.createToken(res),
    };
  }
}