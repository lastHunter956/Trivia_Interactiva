import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreEntity } from './entity/score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(ScoreEntity)
        private readonly scoreRepository: Repository<ScoreEntity>
    ){}

    async findOrCreateScore(userId: string): Promise<ScoreEntity> {
        let score = await this.scoreRepository.findOne({ where: { user: { id: userId } } });
        if (!score) {
          score = this.scoreRepository.create({ user: { id: userId }, totalScore: 0 });
          await this.scoreRepository.save(score);
        }
        return score;
      }
      async updateUserScore(userId: string, points: number): Promise<ScoreEntity> {
        const score = await this.findOrCreateScore(userId);
        score.totalScore += points;
        return this.scoreRepository.save(score);
      }
    
      async getRanking(){
        return this.scoreRepository.find({
          relations: ['user'],
          order: { totalScore: 'DESC' },
        });
      }
    
}
