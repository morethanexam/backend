import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  // 文章类型
  @Column()
  type: string;

  // 文章标题
  @Column()
  title: string;

  // 文章内容，使用 text 类型以存储较长内容
  @Column('text')
  content: string;
} 