import { Controller, Post, Body, BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthLoginDto } from "./dtos/LoginDto";
import { AuthRegisterDto } from "./dtos/RegisterDto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, description: 'The user has been successfully logged in.', schema: { example: { accessToken: 'your_jwt_token' } } })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @ApiBody({ description: 'The login data', type: AuthLoginDto })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    try {
      return await this.authService.login(authLoginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid email or password');
      }
      throw new BadRequestException('An error occurred while logging in');
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', schema: { example: { accessToken: 'your_jwt_token' } } })
  @ApiResponse({ status: 409, description: 'Email already exists.' })
  @ApiBody({ description: 'The registration data', type: AuthRegisterDto })
  async register(@Body() authRegisterDto: AuthRegisterDto): Promise<{ accessToken: string }> {
    try {
      return await this.authService.register(authRegisterDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Email already exists');
      }
      throw new BadRequestException('An error occurred while registering');
    }
  }
}
