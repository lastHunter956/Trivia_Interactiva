import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { TypeUserEntity } from 'src/type-user/entity/type-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, TypeUserEntity])],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
