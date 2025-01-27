import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    // 環境変数からサーバー固有の情報を取得
    const serverSecret = process.env.SERVER_SECRET || 'default-secret';

    // UUID生成
    const userId = crypto.randomUUID();

    // ユーザーIDとサーバー秘密情報を組み合わせてハッシュ化
    const hash = crypto.createHash('sha256');
    hash.update(userId + serverSecret);
    const hashedId = hash.digest('hex');

    // ハッシュ化されたIDを返す
    return NextResponse.json({ userId: hashedId });
}
