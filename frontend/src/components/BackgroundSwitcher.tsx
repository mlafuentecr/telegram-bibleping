// src/components/BackgroundSwitcher.tsx
'use client';

type BackgroundSwitcherProps = {
  onClick?: () => void;
};

export default function BackgroundSwitcher({ onClick }: BackgroundSwitcherProps) {
  return (
    <button className="btn btn--secondary" type="button" onClick={onClick}>
      Change background
    </button>
  );
}
