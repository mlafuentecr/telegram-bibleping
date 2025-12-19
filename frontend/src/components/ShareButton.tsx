'use client';

import { useState } from 'react';

type ShareButtonProps = {
  reference: string;
  text: string;
  imageUrl: string;
};

export default function ShareButton({
  reference,
  text,
  imageUrl,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `📖 ${reference}\n\n${text}\n\n🙏 via BiblePing`;

  const handleShare = async () => {
    // 🔹 Try native share WITH image (Level 2)
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const file = new File([blob], 'bibleping-verse.png', {
          type: blob.type,
        });

        await navigator.share({
          title: reference,
          text: shareText,
          files: [file],
        });

        return;
      } catch (err) {
        console.warn('Image share failed, falling back:', err);
      }
    }

    // 🔹 Fallback: copy text + link
    try {
      await navigator.clipboard.writeText(
        `${shareText}\n\n${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard fallback failed:', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="btn btn--primary"
      aria-label="Share verse"
    >
      {copied ? 'Copied ✓' : 'Share'}
    </button>
  );
}
