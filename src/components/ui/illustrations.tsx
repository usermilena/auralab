import { useId } from "react";

/**
 * Lightweight vector illustrations used in mockups and the website preview.
 * They are placeholders for real photography and accept an `accent` colour
 * so they can follow the brand colour chosen in the builder.
 */

type ArtProps = { accent?: string; className?: string };

export function CupArt({ accent = "#103d2e", className }: ArtProps) {
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="cup-latte" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#f6e7d2" />
          <stop offset="0.55" stopColor="#d8ad7f" />
          <stop offset="1" stopColor="#a8703f" />
        </radialGradient>
        <linearGradient id="cup-body" x1="0" x2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#f3efe9" />
          <stop offset="1" stopColor="#ddd5ca" />
        </linearGradient>
      </defs>
      <circle cx="150" cy="70" r="62" fill={accent} opacity="0.12" />
      <ellipse cx="118" cy="172" rx="92" ry="20" fill="#000" opacity="0.08" />
      <ellipse cx="118" cy="164" rx="84" ry="20" fill="#e9e2d8" />
      <ellipse cx="118" cy="160" rx="72" ry="15" fill="#f8f5f0" />
      <path d="M172 100c22-4 34 6 30 22-4 15-20 22-38 18" fill="none" stroke="#e7e0d6" strokeWidth="10" strokeLinecap="round" />
      <path d="M58 92h120c0 38-18 66-60 66S58 130 58 92Z" fill="url(#cup-body)" />
      <ellipse cx="118" cy="92" rx="60" ry="15" fill="#efe8de" />
      <ellipse cx="118" cy="93" rx="52" ry="11.5" fill="url(#cup-latte)" />
      <path d="M118 101c-9-6-15-9-15-14 0-4 4-6 7-6 4 0 6 2 8 5 2-3 4-5 8-5 3 0 7 2 7 6 0 5-6 8-15 14Z" fill="#fbf3e7" opacity="0.92" />
      <g stroke={accent} strokeOpacity="0.35" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M100 66c-6-8 6-12 0-22" />
        <path d="M120 60c-6-8 6-12 0-22" />
        <path d="M140 66c-6-8 6-12 0-22" />
      </g>
    </svg>
  );
}

export function VaseArt({ accent = "#103d2e", className }: ArtProps) {
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="vase-body" x1="0" x2="1">
          <stop offset="0" stopColor="#fbf8f3" />
          <stop offset="0.6" stopColor="#efe8dd" />
          <stop offset="1" stopColor="#d9cfc1" />
        </linearGradient>
        <linearGradient id="vase-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8d0c4" />
          <stop offset="1" stopColor="#b9ae9f" />
        </linearGradient>
      </defs>
      <circle cx="140" cy="90" r="70" fill={accent} opacity="0.1" />
      <g stroke="#6c7a52" strokeWidth="2.2" fill="none" strokeLinecap="round">
        <path d="M120 96C116 70 104 46 84 24" />
        <path d="M122 96c4-26 18-50 40-70" />
        <path d="M121 96c0-30 2-52 6-78" />
      </g>
      <g fill="#7f9160">
        <ellipse cx="92" cy="40" rx="8" ry="3.6" transform="rotate(-40 92 40)" />
        <ellipse cx="104" cy="58" rx="8" ry="3.6" transform="rotate(30 104 58)" />
        <ellipse cx="150" cy="40" rx="8" ry="3.6" transform="rotate(35 150 40)" />
        <ellipse cx="140" cy="60" rx="8" ry="3.6" transform="rotate(-30 140 60)" />
        <ellipse cx="128" cy="30" rx="7" ry="3.2" transform="rotate(70 128 30)" />
        <ellipse cx="80" cy="28" rx="7" ry="3.2" transform="rotate(20 80 28)" />
        <ellipse cx="160" cy="28" rx="7" ry="3.2" transform="rotate(-20 160 28)" />
      </g>
      <path d="M100 98c0-6 6-8 9-8h24c3 0 9 2 9 8 0 8 16 18 16 46 0 22-14 36-37 36s-37-14-37-36c0-28 16-38 16-46Z" fill="url(#vase-body)" />
      <path d="M38 196c6-14 24-18 52-18h78c22 0 36 6 42 18Z" fill="url(#vase-stone)" />
      <rect x="30" y="194" width="190" height="14" rx="5" fill="#c4b9aa" />
    </svg>
  );
}

export function ArchArt({ accent = "#103d2e", className }: ArtProps) {
  // The gradient depends on `accent`, so each instance needs its own id.
  const fillId = `arch-fill-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={accent} stopOpacity="0.28" />
          <stop offset="1" stopColor={accent} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d="M48 210V96a72 72 0 0 1 144 0v114Z" fill={`url(#${fillId})`} />
      <circle cx="120" cy="96" r="40" fill="#fbf7f4" stroke="#e6d9d3" strokeWidth="4" />
      <circle cx="120" cy="96" r="30" fill="#f1e4de" />
      <rect x="72" y="150" width="20" height="44" rx="6" fill="#f7efe9" stroke="#e2d4cc" strokeWidth="2" />
      <rect x="77" y="140" width="10" height="12" rx="2" fill={accent} opacity="0.7" />
      <rect x="100" y="160" width="26" height="34" rx="12" fill="#efe1d8" />
      <rect x="108" y="152" width="10" height="10" rx="2" fill="#d9c6ba" />
      <g fill="#8aa07a">
        <ellipse cx="160" cy="168" rx="12" ry="5" transform="rotate(-50 160 168)" />
        <ellipse cx="172" cy="160" rx="12" ry="5" transform="rotate(40 172 160)" />
        <ellipse cx="166" cy="150" rx="10" ry="4.5" transform="rotate(-80 166 150)" />
      </g>
      <path d="M152 194h32l-4-20h-24Z" fill="#e8dcd2" />
      <rect x="30" y="194" width="180" height="12" rx="5" fill="#e3d7cf" />
    </svg>
  );
}

export function ShapesArt({ accent = "#103d2e", className }: ArtProps) {
  return (
    <svg viewBox="0 0 240 220" className={className} aria-hidden="true">
      <circle cx="150" cy="80" r="56" fill={accent} opacity="0.9" />
      <path d="M40 200V120a80 80 0 0 1 80 80Z" fill="#dce7e3" />
      <rect x="110" y="128" width="88" height="72" rx="18" fill="#ffffff" stroke="#e1e8e6" strokeWidth="2" />
      <rect x="124" y="146" width="40" height="6" rx="3" fill={accent} opacity="0.6" />
      <rect x="124" y="160" width="58" height="6" rx="3" fill="#dce4e1" />
      <rect x="124" y="172" width="48" height="6" rx="3" fill="#dce4e1" />
      <circle cx="70" cy="64" r="16" fill="none" stroke={accent} strokeOpacity="0.4" strokeWidth="3" />
      <circle cx="196" cy="34" r="6" fill={accent} opacity="0.35" />
    </svg>
  );
}
