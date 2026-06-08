import { useCallback, useEffect, useRef, useState } from 'react'

// Hartă simplă { id: valoare } persistată în localStorage, cu fallback sigur.
// Folosită pentru auto-evaluarea subiectelor și pentru progresul la „Scrie".
export function usePersistedMap(key) {
  const [map, setMap] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      const parsed = raw ? JSON.parse(raw) : {}
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch {
      return {}
    }
  })

  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(map))
    } catch {
      /* localStorage plin/indisponibil — rămâne în memorie */
    }
  }, [key, map])

  const set = useCallback((id, value) => setMap((m) => ({ ...m, [id]: value })), [])
  const reset = useCallback(() => setMap({}), [])

  return { map, set, reset }
}
