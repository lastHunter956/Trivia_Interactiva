import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from '../user/dto/signup.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { refreshTokenDto } from './dto/refreshToken.dto';
import { changePasswordDto } from './dto/changePassword.dto';
import { AuthGuard } from './guard/auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // POST Signup
  @Post('/signup')
  async signUp(@Body() signupData: SignupDto) {
    try {
      return await this.userService.signUp(signupData);
    } catch (error) {
      throw new BadRequestException('Error', error.message);
    }
  }

  // POST Login
  @Post('/login')
  async login(@Body() credential: LoginDto) {
    try {
      return await this.authService.login(credential);
    } catch (error) {
      throw new BadRequestException(`Error`, error.message);
    }
  }

  // POST Refresh Token
  @Post('/refresh')
  async refreshToken(@Body() refreshTokenDto: refreshTokenDto) {
    try {
      const { token } = refreshTokenDto;
      const newToken = await this.authService.refreshToken(token);
      return newToken;
    } catch (error) {
      throw new BadRequestException('Error refreshing token', error.message);
    }
  }

  // PUT Change password
  @UseGuards(AuthGuard)
  @Put('/change-password')
  async changePassword(@Body() data: changePasswordDto, @Req() req) {
    try {
      return await this.authService.changePassword(req.user_id, data);
    } catch (error) {
      throw new BadRequestException('Error changing password', error.message);
    }
  }

  // Post logout
  @Post('/logout')
  async logout(@Req() req) {
    try {
      return await this.authService.logout(req.headers.authorization);
    } catch (error) {
      throw new BadRequestException('Error', error.message);
    }
  }
}
