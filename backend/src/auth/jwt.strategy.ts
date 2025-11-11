import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: {
        sub: string;
        email: string
    }) {
        const user = await this.userService.findById(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            userId: payload.sub,
            email: payload.email,
            id: user.id
        };
    }
}