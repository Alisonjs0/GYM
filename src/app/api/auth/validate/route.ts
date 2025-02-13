import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ message: "Token ausente" }, { status: 400 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    return NextResponse.json({ user: decodedToken }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("auth/id-token-expired")) {
        return NextResponse.json(
          { error: "Token expirado. Faça login novamente." },
          { status: 401 }
        );
      }
      if (error.message.includes("auth/id-token-revoked")) {
        req.cookies.delete("securetoken");
        return NextResponse.json(
          { message: "Token revogado" },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { message: "Erro ao validar o token", details: String(error) },
      { status: 500 }
    );
  }
}
