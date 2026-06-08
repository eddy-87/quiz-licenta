import confetti from 'canvas-confetti'

// Respectă preferința de reducere a mișcării.
function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// Paletă caldă, elegantă (gold/cremă/smarald domol) — fără neon.
const ACCENT = ['#ddb44c', '#e6c66f', '#f6eccf', '#82c79b', '#6fb7c9', '#cf8f6a']

// Mic „burst" satisfăcător la răspuns corect.
export function fireConfetti() {
  if (reducedMotion()) return
  confetti({
    particleCount: 90,
    spread: 75,
    startVelocity: 38,
    origin: { y: 0.65 },
    colors: ACCENT,
    scalar: 0.9,
    disableForReducedMotion: true,
  })
  // un al doilea val mic, din lateral, pentru un efect mai plin
  setTimeout(() => {
    confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ACCENT })
    confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ACCENT })
  }, 120)
}
