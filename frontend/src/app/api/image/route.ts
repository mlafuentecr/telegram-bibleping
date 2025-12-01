// src/app/api/image/route.ts
import { NextResponse } from 'next/server';

const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/image/random`;

export async function GET() {
  try {
    const res = await fetch(BACKEND_URL, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Backend image error:', res.status);
      return NextResponse.json(
        { imageUrl: '/default-bg.jpg' },
        { status: 200 }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { imageUrl: data.imageUrl ?? '/default-bg.jpg' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error calling backend image API:', err);
    return NextResponse.json(
      { imageUrl: '/default-bg.jpg' },
      { status: 200 }
    );
  }
}
