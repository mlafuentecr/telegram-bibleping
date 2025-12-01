// frontend/src/app/api/verse/route.ts
import { NextResponse } from 'next/server';

// GET /api/verse
export async function GET(_request: Request) {
  // De momento algo simple; luego podemos conectarlo al bot o a una API
  return NextResponse.json({
    message: 'BiblePing verse API',
    example: 'John 3:16',
  });
}
