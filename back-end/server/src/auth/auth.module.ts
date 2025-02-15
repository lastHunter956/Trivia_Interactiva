import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { refreshTokensEntity } from './entity/refreshToken.entity';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { resetTokenEntity } from './entity/resetToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      refreshTokensEntity,
      resetTokenEntity,
    ]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
