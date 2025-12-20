import { NextResponse } from 'next/server';

// ⚠️ Podés reemplazar esto por tu data real
const VERSES = [
  {
    reference: 'Psalm 27:1',
    text: 'The Lord is my light and my salvation—whom shall I fear?',
  },
  {
    reference: 'Romans 8:28',
    text: 'All things work together for good to those who love God.',
  },
  {
    reference: 'Proverbs 3:5',
    text: 'Trust in the Lord with all your heart.',
  },
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const language = url.searchParams.get('language') || 'en';

    const randomIndex = Math.floor(Math.random() * VERSES.length);
    const verse = VERSES[randomIndex];

    return NextResponse.json(
      { verse, language },
      { status: 200 }
    );
  } catch (error) {
    console.error('[random verse error]', error);

    return NextResponse.json(
      { error: 'Failed to load random verse' },
      { status: 500 }
    );
  }
}
