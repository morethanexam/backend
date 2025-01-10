import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async create(data: Partial<Word>): Promise<Word> {
    const word = this.wordRepository.create(data);
    return this.wordRepository.save(word);
  }

  async findAll(): Promise<Word[]> {
    return this.wordRepository.find();
  }

  async findOne(id: number): Promise<Word> {
    return this.wordRepository.findOne({ where: { id } });
  }

  async update(id: number, data: Partial<Word>): Promise<Word> {
    await this.wordRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.wordRepository.delete(id);
  }
} 