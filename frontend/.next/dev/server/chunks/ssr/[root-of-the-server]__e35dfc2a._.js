module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "BiblePing"
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Multi-language daily Bible verses for Telegram."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 87,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e35dfc2a._.js.map