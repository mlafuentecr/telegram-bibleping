import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const verse = {
    reference: "John 3:16",
    text: "For God so loved the world...",
    lang: "en",
  };

  res.status(200).json(verse);
}
