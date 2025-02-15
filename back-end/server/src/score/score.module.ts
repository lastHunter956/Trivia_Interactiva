import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreEntity } from './entity/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

   imports: [TypeOrmModule.forFeature([ScoreEntity])],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
