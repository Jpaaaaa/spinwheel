import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, isAdmin } from "@/lib/auth";
import { getNerakarForUser, saveNerakarForUser } from "@/lib/nerakarStore.server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!isAdmin(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const settings = await getNerakarForUser(email!);
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!isAdmin(email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { enabled, queue } = body as { enabled?: unknown; queue?: unknown };

  if (typeof enabled !== "boolean" || !Array.isArray(queue)) {
    return NextResponse.json({ error: "Invalid settings" }, { status: 400 });
  }

  const settings = await saveNerakarForUser(email!, { enabled, queue });
  return NextResponse.json(settings);
}
