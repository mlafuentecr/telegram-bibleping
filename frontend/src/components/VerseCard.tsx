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
        <h2>{reference}</h2>
        <p>{text}</p>

        <div className="verse-card__actions">
          <button onClick={onChangeBackground}>Change background</button>

          {onChangeVerse && (
            <button onClick={onChangeVerse}>New verse</button>
          )}

          {/* 🔥 FIX AQUÍ */}
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
