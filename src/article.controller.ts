import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { ChatgptService } from './chatgpt.service';
import { WordService } from './word.service';

@Controller('articles')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly wordService: WordService,
    private readonly chatgptService: ChatgptService,
  ) {}

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

  @Get(':id/rewrite')
  async rewriteArticle(@Param('id') id: number) {
    const article = await this.articleService.findOne(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    console.log('Original Article:', article);

    const allWords = await this.wordService.findAll();
    const words = allWords.map((w) => w.content);

    console.log('Words:', words);

    const rewrittenText = await this.chatgptService.rewriteArticleWithWords(
      article.content,
      words,
    );

    console.log('Rewritten Text:', rewrittenText);

    return {
      originalTitle: article.title,
      originalType: article.type,
      rewrittenContent: rewrittenText,
    };
  }
} 