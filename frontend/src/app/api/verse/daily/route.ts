import { NextResponse } from 'next/server';

// ⚠️ Podés cambiar esto por tu servicio real
const DAILY_VERSES = [
  {
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd; I shall not want.',
  },
  {
    reference: 'John 3:16',
    text: 'For God so loved the world that He gave His only Son.',
  },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const language = url.searchParams.get('language') || 'en';

    // ejemplo simple: elegir uno fijo por día
    const index = new Date().getDate() % DAILY_VERSES.length;
    const verse = DAILY_VERSES[index];

    return NextResponse.json(
      { verse, language },
      { status: 200 }
    );
  } catch (error) {
    console.error('[daily verse error]', error);

    return NextResponse.json(
      { error: 'Failed to load daily verse' },
      { status: 500 }
    );
  }
}
