import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreEntity } from './entity/score.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('scores')
@Controller('scores')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get(':userId')
  async getUserScore(@Param('userId') userId: string): Promise<ScoreEntity> {
    return this.scoreService.findOrCreateScore(userId);
  }

  @Post('update')
  async updateScore(
    @Body('userId') userId: string,
    @Body('points') points: number
  ): Promise<ScoreEntity> {
    return this.scoreService.updateUserScore(userId, points);
  }

  @Get('ranking/all')
  async getRanking() {
    return this.scoreService.getRanking();
  }
}
