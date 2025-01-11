// 在 main.ts 或 app.module.ts 顶部添加
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 开启CORS
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
dotenv.config();
