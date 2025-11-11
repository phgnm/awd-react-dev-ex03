import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { Public } from 'src/auth/constants';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}
