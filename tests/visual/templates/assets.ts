export const previewImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">
    <defs>
      <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
        <stop offset="0%" stop-color="#0f766e" />
        <stop offset="100%" stop-color="#155e75" />
      </linearGradient>
    </defs>
    <rect width="1200" height="720" rx="48" fill="url(#bg)" />
    <circle cx="920" cy="180" r="120" fill="rgba(255,255,255,0.15)" />
    <circle cx="1020" cy="510" r="160" fill="rgba(255,255,255,0.08)" />
    <rect x="92" y="96" width="360" height="44" rx="22" fill="rgba(255,255,255,0.2)" />
    <rect x="92" y="176" width="560" height="56" rx="28" fill="rgba(255,255,255,0.9)" />
    <rect x="92" y="256" width="450" height="30" rx="15" fill="rgba(255,255,255,0.65)" />
    <rect x="92" y="316" width="330" height="30" rx="15" fill="rgba(255,255,255,0.45)" />
  </svg>
`)}`;

export const airlineLogo = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="18" fill="rgba(255,255,255,0.16)" />
    <path
      d="M16 38.5c8.9-1.2 16.2-4.5 21.7-9.8l10.3-9.9c.8-.8 2-1 3-.5.9.5 1.5 1.4 1.5 2.5 0 .7-.3 1.4-.8 1.9l-7.7 7.5 7.8 1.5c1.2.2 2.1 1.3 2.1 2.5 0 1.4-1.1 2.5-2.5 2.5h-10l-5.8 5.5c-1.4 1.3-3.2 2.1-5.1 2.1H16v-3.8Z"
      fill="#ffffff"
    />
  </svg>
`)}`;

export function makeProductImage(background: string, accent: string, label: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="${background}" />
      <rect x="18" y="22" width="60" height="38" rx="12" fill="${accent}" opacity="0.9" />
      <rect x="26" y="66" width="44" height="8" rx="4" fill="rgba(255,255,255,0.68)" />
      <text
        x="48"
        y="48"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, sans-serif"
        font-size="18"
        font-weight="700"
        fill="#ffffff"
      >
        ${label}
      </text>
    </svg>
  `)}`;
}
