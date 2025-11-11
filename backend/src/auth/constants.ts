import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'fallback-secret-key-that-is-randomly-generated',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-key-that-is-randomly-generated',
}

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);