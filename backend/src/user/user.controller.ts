import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post('register')
    register(
        @Body() body: {
            email: string,
            password: string
        }
    ) {
        return this.userService.register(body.email, body.password)
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
