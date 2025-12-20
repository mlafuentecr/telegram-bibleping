'use client';

import { toPng } from 'html-to-image';
import { RefObject } from 'react';

type ShareButtonProps = {
  reference: string;
  text: string;
  cardRef: RefObject<HTMLDivElement>;
};

export default function ShareButton({
  reference,
  text,
  cardRef,
}: ShareButtonProps) {
  const handleShare = async () => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    try {
      // 🔒 Hide buttons
      card.classList.add('is-sharing');

      // ⏱ wait one frame so DOM updates
      await new Promise((r) => requestAnimationFrame(r));

      const dataUrl = await toPng(card, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'verse.png', { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: reference,
          text,
          files: [file],
        });
      } else {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'verse.png';
        link.click();
      }
    } catch (err) {
      console.error('Share failed', err);
    } finally {
      // 🔓 Restore UI
      card.classList.remove('is-sharing');
    }
  };

  return (
    <button className="btn btn--primary" onClick={handleShare}>
      Share
    </button>
  );
}
