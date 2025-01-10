import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { Word } from './word.entity';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Body() data: Partial<Word>) {
    return this.wordService.create(data);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wordService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Word>) {
    return this.wordService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wordService.remove(id);
  }
} 