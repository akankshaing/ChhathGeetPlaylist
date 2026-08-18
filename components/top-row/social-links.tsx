const LINKS = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.27a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94ZM16.4 4H7.6A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4Zm2.27 12.4a2.28 2.28 0 0 1-2.27 2.27H7.6a2.28 2.28 0 0 1-2.27-2.27V7.6A2.28 2.28 0 0 1 7.6 5.33h8.8a2.28 2.28 0 0 1 2.27 2.27v8.8Zm-2.14-9.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M21.5 8.1s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.8 5 12 5 12 5h0s-3.8 0-6.6.1c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2.3 9.9 2.3 11.6v1.5c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9 1.7.1 6.4.2 6.4.2s3.8 0 6.6-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.5c0-1.7-.2-3.5-.2-3.5ZM9.9 14.9V8.9l5.5 3-5.5 3Z",
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="flex h-9 w-9 items-center justify-center rounded-full text-cream/75 transition hover:bg-white/10 hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
