import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository, MoreThanOrEqual } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { refreshTokensEntity } from './entity/refreshToken.entity';
import { v4 as uuidv4 } from 'uuid';
import { changePasswordDto } from './dto/changePassword.dto';
import { resetTokenEntity } from './entity/resetToken.entity';
import { generateToken } from 'src/utils/generateToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(refreshTokensEntity)
    private refreshTokenRepository: Repository<refreshTokensEntity>,
    @InjectRepository(resetTokenEntity)
    private resetTokenRepository: Repository<resetTokenEntity>,
  ) {}

  async login(credentials: LoginDto): Promise<any> {
    try {
      const { email, password } = credentials;
      // check the email
      
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new UnauthorizedException(
          `Wrong crendential: the email it's wrong`,
        );
      }
      // check the Match Password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException(
          `Wrong credential: the password it's wrong`,
        );
      }
      // Generate the JWT tokens
      const type_user = user.typeUser.type_name;
      return {
        mensage: 'sucess',
        token: await generateToken(
          this.jwtService,
          this.refreshTokenRepository,
          user.id,
          user.email,
          type_user,
        ),
      };
    } catch (error) {
      console.log(error)
      throw new BadRequestException(
        `An error occurred during login`,
        error.message,
      );
    }
  }

  async refreshToken(token: string): Promise<any> {
    try {
      const tokenExist = await this.refreshTokenRepository.findOne({
        where: {
          id: token,
          expyreDate: MoreThanOrEqual(new Date()),
        },
        relations: ['user'],
      });

      if (!tokenExist) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      await this.refreshTokenRepository.remove(tokenExist);
      const newAccessToken = await generateToken(
        this.jwtService,
        this.refreshTokenRepository,
        tokenExist.user.id,
        tokenExist.user.email,
        tokenExist.user.typeUser.type_name,
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred during refresh token',
        error.message,
      );
    }
  }

  async changePassword(id: string, data: changePasswordDto) {
    try {
      // Get the user
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      // Check the old password
      const passwordMatch = await bcrypt.compare(
        data.oldPassword,
        user.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Old password is wrong');
      }
      // the new password and the old password are the same
      if (data.oldPassword === data.newPassword) {
        throw new BadRequestException(
          'The new password is the same as the old password',
        );
      }
      // Change the password
      const newPassword = await bcrypt.hash(data.newPassword, 10);
      user.password = newPassword;
      await this.userRepository.save(user);
      return { mensage: 'Password changed successfully' };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred during change password',
        error.message,
      );
    }
  }

  async logout(token: string) {
    try {
      const tokenExist = await this.refreshTokenRepository.findOne({
        where: {
          id: token,
          expyreDate: MoreThanOrEqual(new Date()),
        },
      });
      if (!tokenExist) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
      await this.refreshTokenRepository.remove(tokenExist);
      return { mensage: 'Logout successfully' };
    } catch (error) {
      throw new BadRequestException(
        'An error occurred during logout',
        error.message,
      );
    }
  }
}
