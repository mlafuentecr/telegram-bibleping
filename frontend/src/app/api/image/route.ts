import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Imagen aleatoria desde Picsum
    const imageUrl = `https://picsum.photos/600/800?random=${Date.now()}`;

    return NextResponse.json(
      { imageUrl },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error in /api/image:', err);

    return NextResponse.json(
      { imageUrl: '/default-bg.jpg' },
      { status: 200 }
    );
  }
}
