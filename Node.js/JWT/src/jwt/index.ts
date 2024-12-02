import { injectable } from "inversify";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";

@injectable()
export class JWT {
  private secret = "xiaoman";
  private jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: this.secret,
  };

  constructor() {
    this.strategy();
  }

  public strategy() {
    let str = new Strategy(this.jwtOptions, (payload, done) => {
      done(null, payload);
    });

    passport.use(str);
  }

  static middleware() {
    // 需要验证中间价
    return passport.authenticate("jwt", { session: false });
  }

  /** 生成token */
  public createToken(payload: object) {
    return jsonwebtoken.sign(payload, this.secret, {
      expiresIn: "1h",
    });
  }

  /** 关联express */
  public init() {
    return passport.initialize();
  }
}
