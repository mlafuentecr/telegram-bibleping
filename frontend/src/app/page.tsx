'use client';

import { useEffect, useState } from 'react';
import VerseCard from '../components/VerseCard';

type Verse = {
  reference: string;
  text: string;
};

export default function HomePage() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState('/default-bg.jpg');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [verseRes, imageRes] = await Promise.all([
        fetch('/api/verse/daily?language=en', { cache: 'no-store' }),
        fetch('/api/image', { cache: 'no-store' }),
      ]);

      const verseJson = await verseRes.json();
      const imageJson = await imageRes.json();

      setVerse(verseJson.verse ?? verseJson);
      setBackgroundUrl(imageJson.imageUrl ?? '/default-bg.jpg');
    } catch (err) {
      console.error('Error fetching data:', err);
      setBackgroundUrl('/default-bg.jpg');
    } finally {
      setLoading(false);
    }
  };

  const changeVerse = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/verse/random?language=en', {
        cache: 'no-store',
      });

      const data = await res.json();
      setVerse(data.verse ?? data);
    } catch (err) {
      console.error('Error changing verse:', err);
    } finally {
      setLoading(false);
    }
  };

  const changeBackground = async () => {
    try {
      const res = await fetch('/api/image', { cache: 'no-store' });
      const data = await res.json();
      setBackgroundUrl(data.imageUrl ?? '/default-bg.jpg');
    } catch (err) {
      console.error('Error changing background:', err);
      setBackgroundUrl('/default-bg.jpg');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="screen">
      <div className="screen__inner">
        {loading || !verse ? (
          <div className="screen__loader">Loading verse…</div>
        ) : (
          <VerseCard
            backgroundUrl={backgroundUrl}
            reference={verse.reference}
            text={verse.text}
            onChangeBackground={changeBackground}
            onChangeVerse={changeVerse}
          />
        )}
      </div>
    </main>
  );
}
