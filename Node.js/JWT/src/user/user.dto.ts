import { IsNotEmpty, IsEmail } from "class-validator";
import { Transform } from "class-transformer";

export class UserDto {
  @IsNotEmpty({ message: "名称是必填的" })
  @Transform(({ value }) => value.trim())
  name: string | undefined;

  @IsNotEmpty({ message: "邮箱是必填的" })
  @IsEmail({}, { message: "邮箱是必填的" })
  email: string | undefined;
}
