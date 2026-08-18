export function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function PauseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="5" width="4" height="14" rx="1" />
      <rect x="13.5" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

export function PreviousIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 5.5v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M18.5 6 8.5 12l10 6V6Z" />
    </svg>
  );
}

export function NextIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 5.5v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M5.5 6l10 6-10 6V6Z" />
    </svg>
  );
}

export function ShuffleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h3.2c1.6 0 2.5.7 3.3 1.8l5 6.4c.8 1.1 1.7 1.8 3.3 1.8H21" />
      <path d="M17.5 4.5 21 6l-3.5 1.5M17.5 19.5 21 18l-3.5-1.5" />
      <path d="M3 18h3.2c1.6 0 2.5-.7 3.3-1.8l.6-.8" />
      <path d="M12.9 8.6l.6-.8c.8-1.1 1.7-1.8 3.3-1.8H21" />
    </svg>
  );
}

export function ListIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 6h12" />
      <path d="M8 12h12" />
      <path d="M8 18h12" />
      <path d="M4 6h.01" />
      <path d="M4 12h.01" />
      <path d="M4 18h.01" />
    </svg>
  );
}

export function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlayingIndicatorIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="4" y="10" width="3" height="6" rx="1">
        <animate attributeName="height" values="6;16;6" dur="1s" repeatCount="indefinite" />
        <animate attributeName="y" values="10;5;10" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="10.5" y="6" width="3" height="14" rx="1">
        <animate attributeName="height" values="14;4;14" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="y" values="6;11;6" dur="1.1s" repeatCount="indefinite" />
      </rect>
      <rect x="17" y="9" width="3" height="10" rx="1">
        <animate attributeName="height" values="10;18;10" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="y" values="9;3;9" dur="0.9s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}
