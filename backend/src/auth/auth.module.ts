import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { jwtConstants } from "./constants";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '15m',
            },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}