export function Mark({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={className}
    >
      <circle
        cx="6"
        cy="6"
        r="4"
        fill="none"
        stroke="#22539B"
        strokeWidth="2.5"
      />
      <path
        d="M6 10v6a6 6 0 0 0 6 6h6"
        fill="none"
        stroke="#22539B"
        strokeWidth="2.5"
      />
      <circle cx="22" cy="22" r="4" fill="#2F8A92" />
    </svg>
  );
}
