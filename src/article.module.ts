import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ChatgptService } from './chatgpt.service';
import { Word } from './word.entity';
import { WordService } from './word.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article, Word]),
  ],
  providers: [ArticleService, ChatgptService, WordService],
  controllers: [ArticleController],
})
export class ArticleModule {} 