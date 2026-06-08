import { useCallback, useEffect, useRef, useState } from 'react'
import { loadProgress, saveProgress, resetProgress, getStorageMode, wasResetDetected } from '../lib/storage'
import { defaultProgress, validateProgress, recordAnswer } from '../lib/progress'

// Hook central: încarcă progresul, îl persistă și expune acțiuni.
// `storageStatus`:
//   'ok'     - se salvează în localStorage
//   'memory' - sesiune temporară (localStorage plin/indisponibil)
//   'reset'  - date corupte detectate și resetate automat
export function useProgress() {
  // Încărcăm O SINGURĂ DATĂ (loadProgress are efecte: șterge datele corupte).
  const init = useRef(null)
  if (init.current === null) {
    const { data, status } = loadProgress(validateProgress)
    const memory = getStorageMode() === 'memory'
    // `wasResetDetected()` e la nivel de modul => supraviețuiește re-montării
    // duble din StrictMode (când a doua încărcare nu mai vede datele corupte).
    const resetSeen = status === 'reset' || wasResetDetected()
    init.current = {
      data: data || defaultProgress(),
      status: memory ? 'memory' : resetSeen ? 'reset' : 'ok',
    }
  }

  const [progress, setProgress] = useState(init.current.data)
  const [storageStatus, setStorageStatus] = useState(init.current.status)

  // Evităm salvarea la prima randare (doar am încărcat).
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const result = saveProgress(progress)
    if (result === 'memory') {
      setStorageStatus((s) => (s === 'reset' ? s : 'memory'))
    }
  }, [progress])

  const answer = useCallback((id, isCorrect) => {
    setProgress((p) => recordAnswer(p, id, isCorrect))
  }, [])

  const reset = useCallback(() => {
    resetProgress()
    setProgress(defaultProgress())
    setStorageStatus(getStorageMode() === 'memory' ? 'memory' : 'ok')
  }, [])

  // Permite ascunderea bannerului „reset" după ce a fost văzut.
  const acknowledgeStatus = useCallback(() => {
    setStorageStatus((s) => (s === 'reset' ? 'ok' : s))
  }, [])

  return { progress, storageStatus, answer, reset, acknowledgeStatus }
}
