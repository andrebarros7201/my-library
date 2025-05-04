import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const payload = verifyJWT(token);

    return NextResponse.json({ user: payload }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 },
    );
  }
}