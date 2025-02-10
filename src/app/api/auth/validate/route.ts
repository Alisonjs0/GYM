import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";
import { cookies } from "next/headers";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Token ausente" }, { status: 400 });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return NextResponse.json({ user: decodedToken });
  } catch (error: string | any) {
    if (error && error.message.includes('auth/id-token-expired')) {
      return NextResponse.json({ error: 'Token expirado. Faça login novamente.' }, { status: 401 });
    }
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });

  }
}
