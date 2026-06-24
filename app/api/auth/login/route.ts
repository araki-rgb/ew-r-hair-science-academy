import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/server/crypto";
import { loginUser, sessionCookieOptions } from "@/lib/server/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: "メールとパスワードを入力してください" }, { status: 400 });
    }

    const result = await loginUser(email, password, verifyPassword);
    if (!result) {
      return NextResponse.json({ error: "メールまたはパスワードが正しくありません" }, { status: 401 });
    }

    const { user, token } = result;
    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        orgId: user.orgId,
        jobTitle: user.jobTitle,
        salonName: user.salonName,
      },
    });
    res.cookies.set(sessionCookieOptions(token));
    return res;
  } catch {
    return NextResponse.json({ error: "ログインに失敗しました" }, { status: 500 });
  }
}