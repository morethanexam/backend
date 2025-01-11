import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
  private openai: OpenAI;

  constructor() {
    // 请将环境变量 OPENAI_API_KEY 配置到 process.env.OPENAI_API_KEY

    this.openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-7808053d66d84158b33d41cff9a146d9'  
    });
  }



  /**
   * 让ChatGPT根据给定的文章内容、单词列表进行改写，并插入这些词语。
   * 同时，在最终返回的HTML中，将这些插入/使用的单词标红。
   */
  async rewriteArticleWithWords(
    originalText: string,
    words: string[],
  ): Promise<string> {
    // 根据需要自定义prompt示例
    const prompt = `
请将以下文章在不改变主要含义的前提下进行改写，要求尽量插入下方给出的所有单词，使其看起来流畅自然。
并在最终生成的文本中，以<span style="color:red">单词</span>的形式高亮所有使用到的单词。

文章原文：
${originalText}

需要插入的单词列表：
${words.join(', ')}

请在输出时直接返回完整HTML文本，不要再添加其他说明。
    `;

    const response = await this.openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
    });

    // 从ChatGPT的回答中获取改写后的文本
    const rewritten = response.choices[0]?.message?.content || '';
    return rewritten;
  }
} 