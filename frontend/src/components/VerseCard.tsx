'use client';

import { forwardRef, useRef, useImperativeHandle } from 'react';
import ShareButton from './ShareButton';

type VerseCardProps = {
  reference: string;
  text: string;
  backgroundUrl: string;
  onChangeBackground: () => void;
  onChangeVerse?: () => void;
};

const VerseCard = forwardRef<HTMLDivElement, VerseCardProps>(
  (
    {
      reference,
      text,
      backgroundUrl,
      onChangeBackground,
      onChangeVerse,
    },
    forwardedRef
  ) => {
    const cardRef = useRef<HTMLDivElement>(null);

    // Expose internal ref to parent if needed
    useImperativeHandle(forwardedRef, () => cardRef.current as HTMLDivElement);

    return (
      <section ref={cardRef} className="verse-card">
        {/* 🖼 Background image */}
        <div
          className="verse-card__bg"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        />

        {/* 🎨 Gradient overlay */}
        <div className="verse-card__overlay" />

        {/* 📄 Content */}
        <div className="verse-card__content">
          <h2 className="verse-card__reference">{reference}</h2>
          <p className="verse-card__text">{text}</p>

          <div className="verse-card__actions">
            <button
              type="button"
              onClick={onChangeBackground}
              className="btn btn--secondary"
            >
              ↻ Background
            </button>

            {onChangeVerse && (
              <button
                type="button"
                onClick={onChangeVerse}
                className="btn btn--secondary"
              >
                New verse
              </button>
            )}

            <ShareButton
              reference={reference}
              text={text}
              cardRef={cardRef}
            />
          </div>
        </div>
      </section>
    );
  }
);

VerseCard.displayName = 'VerseCard';

export default VerseCard;
