import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { error } from 'console';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY_JSON ?? '{}');

// firebase admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, title, body: messageBody } = body;

  if (!token || !title || !messageBody) {
    return NextResponse.json({ error: '필수 값 누락' }, { status: 400 });
  }

  try {
    const response = await admin.messaging().send({
      token,
      notification: { title, body: messageBody },
    });

    return NextResponse.json({ success: true, response });
  } catch {
    console.error('푸시 전송 실패', error);
    return NextResponse.json({ error: '푸시 전송 실패' }, { status: 500 });
  }
}
