// Set minimal de iconuri line (stroke) — aspect curat, elegant, fără emoji.
export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.7 }) {
  const p = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  }
  switch (name) {
    case 'panel':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.6" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.6" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.6" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.6" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5V12l3 1.8" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...p}>
          <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
        </svg>
      )
    case 'target':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'repeat':
      return (
        <svg {...p}>
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      )
    case 'flame':
      return (
        <svg {...p}>
          <path d="M12 3c1.5 3 4.5 4.5 4.5 8.5A4.5 4.5 0 0 1 12 16a4.5 4.5 0 0 1-4.5-4.5C7.5 9 9 7.5 9.5 6.5c.4 1 1 1.6 1.8 2C11.5 6.5 11 4.5 12 3Z" />
          <path d="M7.5 13.5a4.5 4.5 0 0 0 9 0" />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg {...p}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...p}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg {...p}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      )
    case 'check':
      return (
        <svg {...p}>
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      )
    case 'close':
      return (
        <svg {...p}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      )
    case 'cap': // tichie de absolvire (graduation)
      return (
        <svg {...p}>
          <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
          <path d="M6 11v4.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V11" />
          <path d="M21.5 9v4.5" />
        </svg>
      )
    case 'bolt':
      return (
        <svg {...p}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      )
    case 'book':
      return (
        <svg {...p}>
          <path d="M6.5 3H17a1.5 1.5 0 0 1 1.5 1.5V21l-3-1.8L12.5 21 9.5 19.2 6.5 21V4.5A1.5 1.5 0 0 1 6.5 3Z" />
          <path d="M9.5 7.5h6M9.5 11h6" />
        </svg>
      )
    default:
      return null
  }
}
