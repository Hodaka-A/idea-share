import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA77vSIs19cO9Av7z0VPsRmB2TcYFVsPT0';

const genAI = new GoogleGenerativeAI(API_KEY);

export async function startGemini(prompt: string) {
    //gemini-proモデルを使用
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // プロンプトに基づいてテキストを生成
    const result = await model.generateContent(prompt);

    // 生成されたテキストを取得
    const response = await result.response;

    // テキストを抽出
    const text = response.text();

    return text;
}