import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingGateway } from './ranking.gateway';
import { ScoreService } from 'src/score/score.service';
import { ScoreEntity } from 'src/score/entity/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreEntity])],
  providers: [RankingGateway, RankingService, ScoreService],
})
export class RankingModule {}
