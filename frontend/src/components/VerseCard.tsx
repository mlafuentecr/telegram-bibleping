// src/components/VerseCard.tsx
'use client';

import React from 'react';
import BackgroundSwitcher from './BackgroundSwitcher';
import ShareButton from './ShareButton';

type VerseCardProps = {
  backgroundUrl: string;
  reference: string;
  text: string;
  onChangeBackground?: () => void;
};

const VerseCard: React.FC<VerseCardProps> = ({
  backgroundUrl,
  reference,
  text,
  onChangeBackground,
}) => {
  return (
    <section className="verse-card">
      <div
        className="verse-card__bg"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />
      <div className="verse-card__overlay" />

      <div className="verse-card__content">
        <p className="verse-card__label">Today&apos;s Verse</p>
        <h1 className="verse-card__reference">{reference}</h1>
        <p className="verse-card__text">{text}</p>

        <div className="verse-card__actions">
          <BackgroundSwitcher onClick={onChangeBackground} />
          <ShareButton reference={reference} text={text} />
        </div>
      </div>
    </section>
  );
};

export default VerseCard;
