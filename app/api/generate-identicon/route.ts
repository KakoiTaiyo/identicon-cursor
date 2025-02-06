import { NextRequest, NextResponse } from "next/server";
import * as jdenticon from "jdenticon";
import crypto from 'crypto';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("userId");

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const serverSecret = process.env.SERVER_SECRET || 'default-secret';

    const hash = crypto.createHash('sha256');
    hash.update(id + serverSecret);
    const hashedId = hash.digest('hex');

    // Identicon生成（サイズは40px）
    const identiconSvg = jdenticon.toSvg(hashedId, 40);

    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(identiconSvg)}`;

    return NextResponse.json({ identicon: dataUri });
}
