import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const { access_token, user: userWithoutPassword } = await this.authService.login(user);
    return { access_token, user: userWithoutPassword };
  }

  @Post('register')
  async register(@Body() body) {
    const user = await this.authService.register(body.username, body.email, body.password);
    return user;
  }
}
