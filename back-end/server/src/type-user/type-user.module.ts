import { Module } from '@nestjs/common';
import { TypeUserService } from './type-user.service';
import { TypeUserController } from './type-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeUserEntity } from './entity/type-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeUserEntity])],
  controllers: [TypeUserController],
  providers: [TypeUserService],
})
export class TypeUserModule {}
