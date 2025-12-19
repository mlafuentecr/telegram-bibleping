'use client';

import { useState } from 'react';

type ShareButtonProps = {
  reference: string;
  text: string;
};

export default function ShareButton({ reference, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `📖 ${reference}\n\n${text}\n\n🙏 via BiblePing`;

  const handleShare = async () => {
    // 1️⃣ Native share (mobile first)
    if (navigator.share) {
      try {
        await navigator.share({
          title: reference,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // user cancelled → silently ignore
      }
    }

    // 2️⃣ Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(
        `${shareText}\n${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Share failed:', err);
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
