// src/components/ShareButton.tsx
'use client';

type ShareButtonProps = {
  reference: string;
  text: string;
};

export default function ShareButton({ reference, text }: ShareButtonProps) {
  const handleShare = async () => {
    const shareText = `${reference}\n\n${text}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: reference,
          text: shareText,
        });
      } catch {
        // usuario canceló
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Versículo copiado al portapapeles');
      } catch (err) {
        console.error('Error copying to clipboard:', err);
      }
    }
  };

  return (
    <button className="btn btn--primary" type="button" onClick={handleShare}>
      Share
    </button>
  );
}
