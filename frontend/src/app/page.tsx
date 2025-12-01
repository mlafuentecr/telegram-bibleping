// // src/app/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import VerseCard from '../components/VerseCard';

// type Verse = {
//   reference: string;
//   text: string;
// };

// export default function HomePage() {
//   const [verse, setVerse] = useState<Verse | null>(null);
//   const [backgroundUrl, setBackgroundUrl] = useState<string>('/default-bg.jpg');
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const [verseRes, imageRes] = await Promise.all([
//         fetch('http://localhost:3001/api/verse/daily?language=es'),
//         fetch('http://localhost:3001/api/image/random'),
//       ]);

//       const verseJson = await verseRes.json();
//       const imageJson = await imageRes.json();

//       setVerse(verseJson.verse);
//       setBackgroundUrl(imageJson.imageUrl ?? '/default-bg.jpg');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setBackgroundUrl('/default-bg.jpg');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changeBackground = async () => {
//     try {
//       console.log('Change background clicked');

//       const res = await fetch('http://localhost:3001/api/image/random', {
//         cache: 'no-store',
//       });

//       if (!res.ok) {
//         console.error('Error HTTP cambiando background:', res.status);
//         setBackgroundUrl('/default-bg.jpg');
//         return;
//       }

//       const data = await res.json();
//       console.log('Nueva imagen:', data);

//       setBackgroundUrl(data.imageUrl ?? '/default-bg.jpg');
//     } catch (err) {
//       console.error('Error changing background:', err);
//       setBackgroundUrl('/default-bg.jpg');
//     }
//      window.location.reload();
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <main className="screen">
//       <div className="screen__inner">
//         {loading || !verse ? (
//           <div className="screen__loader">Loading verse…</div>
//         ) : (
//           <VerseCard
//             backgroundUrl={backgroundUrl}
//             reference={verse.reference}
//             text={verse.text}
//             onChangeBackground={changeBackground}
//           />
//         )}
//       </div>
//     </main>
//   );
// }
export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column" }}>
      <h1>BiblePing</h1>
      <p>Multi-language daily Bible verses for Telegram.</p>
    </main>
  );
}
