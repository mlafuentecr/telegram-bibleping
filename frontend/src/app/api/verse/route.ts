import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get('language') ?? 'en';

  const verse =
    lang === 'es'
      ? {
          reference: 'Juan 3:16',
          text: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito…',
        }
      : {
          reference: 'John 3:16',
          text: 'For God so loved the world that he gave his one and only Son…',
        };

  return NextResponse.json({ verse }, { status: 200 });
}
