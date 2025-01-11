import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { UserModule } from './user.module';
import { ArticleModule } from './article.module';
import { WordModule } from './word.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // 或者提供 CA 证书路径
      },
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    ArticleModule,
    WordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
