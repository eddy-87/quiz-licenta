// ============================================================================
//  Modelul de progres + funcții pure de actualizare.
//
//  Formă:
//  {
//    version: 1,
//    questions: { [id]: { seen, correct, wrong, streak } }
//        - seen   : de câte ori a fost văzută
//        - correct: răspunsuri corecte (total)
//        - wrong  : răspunsuri greșite (total)
//        - streak : răspunsuri corecte CONSECUTIVE (resetat la greșeală)
//    global: { currentStreak, bestStreak, totalAnswered }
//    history: { 'YYYY-MM-DD': { correct, total } }   // pt. graficul în timp
//  }
// ============================================================================

export const PROGRESS_VERSION = 1

export function defaultProgress() {
  return {
    version: PROGRESS_VERSION,
    questions: {},
    global: { currentStreak: 0, bestStreak: 0, totalAnswered: 0 },
    history: {},
  }
}

// Validare de schemă folosită la încărcarea din localStorage (detectează corupția).
export function validateProgress(p) {
  if (!p || typeof p !== 'object') return false
  if (p.version !== PROGRESS_VERSION) return false
  if (typeof p.questions !== 'object' || p.questions === null) return false
  if (typeof p.global !== 'object' || p.global === null) return false
  if (typeof p.history !== 'object' || p.history === null) return false
  const g = p.global
  if (
    typeof g.currentStreak !== 'number' ||
    typeof g.bestStreak !== 'number' ||
    typeof g.totalAnswered !== 'number'
  )
    return false
  return true
}

export function getQStat(progress, id) {
  return progress.questions[id] || { seen: 0, correct: 0, wrong: 0, streak: 0 }
}

function todayKey() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

// Înregistrează un răspuns. Returnează un OBIECT NOU de progres (imutabil).
export function recordAnswer(progress, id, isCorrect) {
  const next = {
    version: PROGRESS_VERSION,
    questions: { ...progress.questions },
    global: { ...progress.global },
    history: { ...progress.history },
  }

  const prev = getQStat(progress, id)
  const q = {
    seen: prev.seen + 1,
    correct: prev.correct + (isCorrect ? 1 : 0),
    wrong: prev.wrong + (isCorrect ? 0 : 1),
    streak: isCorrect ? prev.streak + 1 : 0,
  }
  next.questions[id] = q

  // Streak global
  if (isCorrect) {
    next.global.currentStreak = progress.global.currentStreak + 1
    next.global.bestStreak = Math.max(progress.global.bestStreak, next.global.currentStreak)
  } else {
    next.global.currentStreak = 0
  }
  next.global.totalAnswered = progress.global.totalAnswered + 1

  // Istoric pe zi
  const k = todayKey()
  const day = next.history[k] || { correct: 0, total: 0 }
  next.history[k] = {
    correct: day.correct + (isCorrect ? 1 : 0),
    total: day.total + 1,
  }

  return next
}
