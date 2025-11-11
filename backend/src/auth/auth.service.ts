import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        email: string,
        pass: string
    ) : Promise<any> {
        const user = await this.userService.findByEmail(email);

        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }

        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user._id
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.secret,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.refreshSecret,
                expiresIn: '7d',
            }),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: jwtConstants.refreshSecret,
            });

            const user = await this.userService.findById(payload.sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const newPayload = {
                email: user.email,
                sub: user.id
            };

            const accessToken = await this.jwtService.signAsync(newPayload, {
                secret: jwtConstants.secret,
                expiresIn: '15m',
            });

            return {
                accessToken,
            };
        }
        catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async register(email: string, pass: string): Promise<any> {
        const existing = await this.userService.findByEmail(email);

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.userService.create(email, pass);

        // Don't return the password in the response
        const { password, ...result } = user.toObject();
        return result;
    }
}