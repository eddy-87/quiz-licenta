// ============================================================================
//  Selecția întrebărilor + spaced repetition.
//
//  Reguli (din cerințe):
//   - întrebările greșite apar de 2x mai des decât cele corecte
//   - întrebările greșite de 3+ ori apar de 3x mai des
//   - întrebările corecte de 3+ ori consecutive apar mai rar
//
//  Implementare: fiecărei întrebări i se atribuie o GREUTATE, iar selecția
//  „următoarea întrebare" este o tragere aleatorie ponderată.
// ============================================================================

import { getQStat } from './progress'

// Greutatea unei întrebări în funcție de istoricul ei.
export function questionWeight(progress, id) {
  const s = getQStat(progress, id)

  // Întrebare nevăzută încă -> prioritate ușoară ca să fie introdusă în rotație.
  if (s.seen === 0) return 1.5

  let w = 1 // baza = întrebare „corectă"
  if (s.wrong >= 3) w = 3 // greșite de 3+ ori -> 3x
  else if (s.wrong >= 1) w = 2 // greșite cel puțin o dată -> 2x

  // Corecte de 3+ ori consecutive -> apar mai rar.
  if (s.streak >= 3) w *= 0.35

  return w
}

// Amestecare Fisher–Yates (folosită și pt. variantele de răspuns).
export function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Returnează variantele amestecate + noul index al răspunsului corect.
export function shuffleOptions(question) {
  const idx = question.options.map((_, i) => i)
  const order = shuffle(idx)
  const options = order.map((i) => question.options[i])
  const correct = order.indexOf(question.correct)
  return { options, correct }
}

// Tragere ponderată dintr-un pool de întrebări. `excludeId` evită repetarea
// imediată a aceleiași întrebări.
export function pickWeighted(pool, progress, excludeId = null) {
  const candidates = pool.length > 1 && excludeId ? pool.filter((q) => q.id !== excludeId) : pool
  const list = candidates.length ? candidates : pool

  const weights = list.map((q) => questionWeight(progress, q.id))
  const total = weights.reduce((a, b) => a + b, 0)
  if (total <= 0) return list[Math.floor(Math.random() * list.length)]

  let r = Math.random() * total
  for (let i = 0; i < list.length; i++) {
    r -= weights[i]
    if (r <= 0) return list[i]
  }
  return list[list.length - 1]
}

// Pool pentru „Mod Slab": doar întrebări greșite de cel puțin `minWrong` ori.
export function weakPool(allQuestions, progress, minWrong = 2) {
  return allQuestions.filter((q) => getQStat(progress, q.id).wrong >= minWrong)
}

// Construiește un set fix pentru „Mod Examen": `count` întrebări aleatorii,
// distribuite cât mai uniform pe capitole, cu variantele amestecate.
export function buildExamSet(allQuestions, count) {
  const byChapter = {}
  for (const q of allQuestions) {
    ;(byChapter[q.ch] = byChapter[q.ch] || []).push(q)
  }
  const chapters = Object.keys(byChapter)
  const shuffledByCh = {}
  for (const c of chapters) shuffledByCh[c] = shuffle(byChapter[c])

  // Distribuie round-robin pe capitole.
  const picked = []
  let i = 0
  while (picked.length < count) {
    let addedThisRound = 0
    for (const c of chapters) {
      if (picked.length >= count) break
      if (shuffledByCh[c][i]) {
        picked.push(shuffledByCh[c][i])
        addedThisRound++
      }
    }
    if (addedThisRound === 0) break // s-au epuizat întrebările
    i++
  }

  return shuffle(picked).map((q) => ({ ...q, ...shuffleOptions(q) }))
}
