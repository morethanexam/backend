import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() data: Partial<Article>) {
    return this.articleService.create(data);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Article>) {
    return this.articleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
} 