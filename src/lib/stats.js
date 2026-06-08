// ============================================================================
//  Calculul statisticilor afișate în ecranul „Statistici".
// ============================================================================

import { QUESTIONS, CHAPTERS } from '../data/questions'
import { getQStat } from './progress'

// Scor de „cunoaștere" per întrebare (0..100):
//  - nevăzută            -> 0
//  - 3+ corecte la rând  -> 100 (stăpânită)
//  - altfel              -> procent corecte din total răspunsuri
function questionMastery(s) {
  if (!s || s.seen === 0) return 0
  if (s.streak >= 3) return 100
  const answered = s.correct + s.wrong
  if (answered === 0) return 0
  return Math.round((s.correct / answered) * 100)
}

// Procent de cunoaștere per capitol (media masteriei tuturor întrebărilor,
// inclusiv cele nevăzute ca 0 -> reflectă și acoperirea, și acuratețea).
export function chapterKnowledge(progress) {
  return CHAPTERS.map((ch) => {
    const qs = QUESTIONS.filter((q) => q.ch === ch.id)
    const sum = qs.reduce((acc, q) => acc + questionMastery(getQStat(progress, q.id)), 0)
    const seen = qs.filter((q) => getQStat(progress, q.id).seen > 0).length
    return {
      ...ch,
      total: qs.length,
      seen,
      percent: qs.length ? Math.round(sum / qs.length) : 0,
    }
  })
}

// Total întrebări rezolvate (văzute cel puțin o dată) / rămase.
export function coverage(progress) {
  const total = QUESTIONS.length
  const solved = QUESTIONS.filter((q) => getQStat(progress, q.id).seen > 0).length
  return { total, solved, remaining: total - solved }
}

// Top N cele mai greșite întrebări.
export function topWrong(progress, n = 5) {
  return QUESTIONS.map((q) => ({ q, wrong: getQStat(progress, q.id).wrong }))
    .filter((x) => x.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, n)
}

// Serie pentru graficul de progres în timp: acuratețea pe zi (ultimele `days` zile).
export function historySeries(progress, days = 14) {
  const out = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const key = `${d.getFullYear()}-${m}-${day}`
    const rec = progress.history[key]
    out.push({
      key,
      label: `${day}.${m}`,
      total: rec ? rec.total : 0,
      correct: rec ? rec.correct : 0,
      accuracy: rec && rec.total ? Math.round((rec.correct / rec.total) * 100) : null,
    })
  }
  return out
}

// Acuratețea globală (din toate răspunsurile înregistrate).
export function overallAccuracy(progress) {
  let correct = 0
  let total = 0
  for (const id in progress.questions) {
    const s = progress.questions[id]
    correct += s.correct
    total += s.correct + s.wrong
  }
  return { correct, total, percent: total ? Math.round((correct / total) * 100) : 0 }
}
