import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import {Server as SockerIoService} from 'socket.io';
import { TypeUserModule } from './type-user/type-user.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { SeedModule } from './seed/seed.module';
import { ScoreModule } from './score/score.module';
import { RankingModule } from './ranking/ranking.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
    AuthModule, UserModule, TypeUserModule, CategoryModule, QuestionModule, SeedModule, ScoreModule, RankingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
