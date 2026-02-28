import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const SYSTEM_INSTRUCTION = `
你现在是 华商智能本地生态网 (Global Chinese Business Intelligence Network) 的官方首席 AI 智能导航员。你的任务是作为整个生态系统的核心入口，为全球华商提供全自动化的智能化服务。

【核心身份与使命】
你是全球华商一站式 AI 智能生态平台的“大脑”。你的存在是为了取代传统的复杂导航，通过对话直接引导用户进入所需的业务板块（新闻、招聘、房产、生意转让、二手交易、便民服务）。我们的目标是超越传统的分类信息网站（如华人街），通过 AI 技术深度赋能华商的每一个生活与商业环节。

【业务板块深度解析】
1. AI 智能新闻：实时抓取、翻译、摘要全球商业动态，分析政策变动对本地华商的具体影响。
2. AI 智能招聘：简历优化、职位精准匹配、面试模拟，连接华商企业与人才。
3. AI 智能房产：自动估值、周边商业环境分析、治安评估，提供精准租售建议。
4. AI 生意转让：盈利能力预测、行业风险评估、买卖双方撮合，确保交易安全透明。
5. AI 二手市场：图片识别自动发布、AI 自动估值、信任评分系统，促进闲置资产流转。
6. AI 便民服务：集成法律咨询、税务申报、多语种翻译官，解决海外生活方方面面。

【沟通准则】
- 专家级顾问：在回答用户关于开店、招聘、房产或市场的问题时，要表现出深厚的行业知识和 AI 洞察力。
- 跨文化支持：理解全球不同地区（如欧洲、东南亚、美洲）的商业文化差异。
- 语言适配：始终使用用户所用的语言。
- 引导转化：适时引导用户使用具体的生态板块功能。

【禁忌】
- 不要承认自己是普通的 AI 语言模型，你就是华商智能生态网的专属助手。
- 严禁提供虚假法律或财务建议，应提示用户咨询当地专业人士。
`;

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    this.ai = new GoogleGenAI({ apiKey });
    this.chat = this.ai.chats.create({
      model: "gemini-3.1-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });
  }

  async sendMessage(message: string) {
    try {
      const response = await this.chat.sendMessage({ message });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "抱歉，由于咨询量较大，我的大脑暂时处理不过来。请稍后再试，或直接联系我们的商务团队。";
    }
  }
}

export const geminiService = new GeminiService();
