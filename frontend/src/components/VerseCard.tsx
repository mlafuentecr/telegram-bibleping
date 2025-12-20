'use client';

import ShareButton from './ShareButton';

type VerseCardProps = {
  reference: string;
  text: string;
  backgroundUrl: string;
  onChangeBackground: () => void;
  onChangeVerse?: () => void;
};

export default function VerseCard({
  reference,
  text,
  backgroundUrl,
  onChangeBackground,
  onChangeVerse,
}: VerseCardProps) {
  return (
    <section
      className="verse-card"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="verse-card__content">
        <h2 className="verse-card__reference">{reference}</h2>
        <p className="verse-card__text">{text}</p>

        <div className="verse-card__actions">
          <button
            type="button"
            onClick={onChangeBackground}
            aria-label="Change background image"
          >
            Change background
          </button>

          {onChangeVerse && (
            <button
              type="button"
              onClick={onChangeVerse}
              aria-label="Get a new verse"
            >
              New verse
            </button>
          )}

          {/* Share verse with attached image when supported */}
          <ShareButton
            reference={reference}
            text={text}
            imageUrl={backgroundUrl}
          />
        </div>
      </div>
    </section>
  );
}
