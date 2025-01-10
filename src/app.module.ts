import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user.entity';
import { UserModule } from './user.module';
import { ArticleModule } from './article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'passexam.cp0oikss4sxm.ap-southeast-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: '19990310',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // 或者提供 CA 证书路径
      },
    }),
    TypeOrmModule.forFeature([User]),
    UserModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
