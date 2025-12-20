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
    const element = cardRef.current;
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'verse.png', { type: 'image/png' });

      // 📱 Mobile / modern browsers
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: reference,
          text,
          files: [file],
        });
        return;
      }

      // 💻 Fallback: download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'verse.png';
      link.click();
    } catch (err) {
      console.error('Error sharing image:', err);
      alert('Unable to share image');
    }
  };

  return (
    <button
      type="button"
      className="btn btn--primary"
      onClick={handleShare}
      aria-label="Share verse as image"
    >
      Share
    </button>
  );
}
