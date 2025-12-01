import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // Ejemplo simple: luego aquí metemos traducciones, idioma, etc.
  const verse = {
    reference: "John 3:16",
    text: "For God so loved the world...",
    lang: "en",
  };

  return NextResponse.json(verse);
}
