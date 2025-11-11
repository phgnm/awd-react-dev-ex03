import { Body, Controller, Post, HttpCode, HttpStatus, UnauthorizedException, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './constants'; 

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public() 
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Public()
      @Post('register')
      register(
          @Body() body: {
              email: string,
              password: string
          }
      ) {
          return this.authService.register(body.email, body.password)
      }


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    return this.authService.refreshTokens(body.refreshToken);
  }
}