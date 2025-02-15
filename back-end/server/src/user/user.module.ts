import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { refreshTokensEntity } from 'src/auth/entity/refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, refreshTokensEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
