import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(data: Partial<Article>): Promise<Article> {
    const article = this.articleRepository.create(data);
    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Article>): Promise<Article> {
    await this.articleRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }
} 