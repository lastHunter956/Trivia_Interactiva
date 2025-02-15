import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/user/dto/signup.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { generateId } from '../utils/generateId';
import { UpdateDto } from 'src/user/dto/update.dto';
import { generateToken } from 'src/utils/generateToken';
import { JwtService } from '@nestjs/jwt';
import { refreshTokensEntity } from 'src/auth/entity/refreshToken.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(refreshTokensEntity)
    private readonly refreshTokenRepository: Repository<refreshTokensEntity>,
  ) {}

  async signUp(signupData: SignupDto): Promise<any> {
    try {
      const { email, password, type_id } = signupData;

      // check if email is in use
      const emailInUse = await this.userRepository.findOne({
        where: { email },
      });
      if (emailInUse) {
        throw new BadRequestException(`The email ${email} is already in use`);
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save User
      const data = await this.userRepository.save({
        id: await generateId(this.userRepository, 'id', 'user'),
        password: hashedPassword,
        email,
        typeUser: { id_type: type_id },
      });
      return {
        message: 'success',
        data: data,
      };
    } catch (error) {
      throw new BadRequestException(
        `An error occurred during signup`,
        error.message,
      );
    }
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        relations: ["typeUser"]
      });
    } catch (error) {
      throw new BadRequestException(
        `An error ocured during find one`,
        error.message,
      );
    }
  }

  async find(email: string): Promise<any> {
    try {
      return await this.userRepository.find({
        where: { email },
        relations: ['typeUser'],
      });
    } catch (error) {
      throw new BadRequestException(
        `An error ocured during find one`,
        error.message,
      );
    }
  }

  async getUserInfo(email: string): Promise<any> {
    try {
      const userData = await this.findOne(email);
      if (!userData) {
        throw new BadRequestException('User not found');
      }
      return {
        id: userData.id,
        email: userData.email,

        firstName: userData.firstName,
        lastName: userData.lastName,
      };
    } catch (error) {
      console.error(
        'Error occurred during getting the user info:',
        error.message,
      );
      throw new BadRequestException(
        'An error occurred during getting the user info',
        error.message,
      );
    }
  }

  async updateProfile(email: string, updateProfile: UpdateDto): Promise<any> {
    try {
      console.log('updateProfile', updateProfile);
      console.log('email', email);

      if (
        updateProfile.firstName === undefined ||
        updateProfile.firstName === null ||
        updateProfile.lastName === undefined ||
        updateProfile.lastName === null
      ) {
        throw new BadRequestException(
          'First name, last name, and color are required to update the profile',
        );
      }

      // Update the user profile in the database
      const update = await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          firstName: updateProfile.firstName,
          lastName: updateProfile.lastName,
        })
        .where('email = :email', { email: email })
        .execute();

      if (update.affected === 0) {
        throw new BadRequestException('User not found');
      }

      // Regenerate the JWT token with updated user information
      const userData = await this.userRepository.findOne({ where: { email } });
      if (!userData) {
        throw new BadRequestException('User not found');
      }

      const newTokens = await generateToken(
        this.jwtService,
        this.refreshTokenRepository,
        userData.id,
        userData.email,
        userData.typeUser.type_name,
      );

      return {
        user: {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        },
        message: 'Profile updated successfully',
        tokens: newTokens,
      };
    } catch (error) {
      console.error('Error during profile update:', error.message);
      throw new BadRequestException(
        'An error occurred during updating the user',
        error.message,
      );
    }
  }
}
