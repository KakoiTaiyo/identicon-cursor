import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    // UUID生成
    const userId = crypto.randomUUID();
    // ハッシュ化されたIDを返す
    return NextResponse.json({ userId: userId });
}
