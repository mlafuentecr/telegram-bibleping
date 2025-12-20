'use client';

import { useEffect, useState } from 'react';
import VerseCard from '../components/VerseCard';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

type Verse = {
  reference: string;
  text: string;
};

export default function HomePage() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string>('/default-bg.jpg');
  const [loading, setLoading] = useState(true);

  /**
   * Fetch DAILY verse + background on first load
   */
  const fetchData = async () => {
    try {
      setLoading(true);

      const [verseRes, imageRes] = await Promise.all([
        fetch(`${API_BASE}/api/verse/daily?language=en`, { cache: 'no-store' }),
        fetch(`${API_BASE}/api/image`, { cache: 'no-store' }),
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

  /**
   * Fetch RANDOM verse
   */
  const changeVerse = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/verse/random?language=en`,
        { cache: 'no-store' }
      );

      if (!res.ok) {
        console.error('Error fetching random verse:', res.status);
        return;
      }

      const data = await res.json();
      setVerse(data.verse ?? data);
    } catch (err) {
      console.error('Error changing verse:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Change ONLY the background image
   */
  const changeBackground = async () => {
    try {
      const res = await fetch(`/api/image`, { cache: 'no-store' });

      if (!res.ok) {
        console.error('Error fetching background image:', res.status);
        setBackgroundUrl('/default-bg.jpg');
        return;
      }

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
