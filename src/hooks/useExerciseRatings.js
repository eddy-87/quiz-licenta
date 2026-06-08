import { useCallback, useEffect, useRef, useState } from 'react'

// Auto-evaluarea subiectelor deschise (Știam / Parțial / Nu știam).
// Stocare izolată față de progresul grilelor, cu fallback sigur la memorie.
const KEY = 'exam-licenta:exercises:v1'

function safeLoad() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function useExerciseRatings() {
  const [ratings, setRatings] = useState(() => safeLoad())
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(ratings))
    } catch {
      /* localStorage plin/indisponibil — rămâne doar în memorie */
    }
  }, [ratings])

  const setRating = useCallback((id, rating) => {
    setRatings((r) => ({ ...r, [id]: rating }))
  }, [])

  const resetRatings = useCallback(() => setRatings({}), [])

  return { ratings, setRating, resetRatings }
}
