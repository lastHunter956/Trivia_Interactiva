import {
  Controller,
  Get,
  UseGuards,
  Req,
  UnauthorizedException,
  Put,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UpdateDto } from 'src/user/dto/update.dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/update-profile')
  async updateProfile(@Req() req, @Body() updateData: UpdateDto) {
    try {
      return await this.userService.updateProfile(req.user.email, updateData);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      throw new UnauthorizedException('Unauthorized');
    }
  }

  @Get('/get-profile')
  async getProfile(@Req() req) {
    try {
      if (!req.user || !req.user.email) {
        throw new UnauthorizedException('ERROR jwt expired');
      }
      return await this.userService.getUserInfo(req.user.email);
    } catch (error) {
      console.log(req.email);
      console.error('Error:', error.message);
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
