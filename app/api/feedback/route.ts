import { db } from '@/db/drizzle';
import { feedback } from '@/schema'; // adjust import as needed
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(feedback).values({
      type: body.type,
      name: body.name,
      url: body.url,
      issue: body.issue,
      reason: body.reason,
      logs: body.logs,
      message: body.message,
      email: body.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[FEEDBACK_POST_ERROR]', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
