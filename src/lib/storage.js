// ============================================================================
//  Stocare robustă peste localStorage.
//  Tratează:
//   - localStorage indisponibil (mod incognito, browser restricționat)
//   - localStorage plin (QuotaExceededError) -> fallback la memorie
//   - progres corupt (JSON invalid / schemă greșită) -> reset automat
//
//  Status posibil:
//   'ok'      - persistă normal în localStorage
//   'memory'  - rulează doar în memorie (sesiune temporară), date NU se păstrează
//   'reset'   - s-a detectat date corupte și s-au resetat automat
// ============================================================================

const KEY = 'exam-licenta:progress:v1'

let memoryStore = null // fallback în-memorie
let mode = 'ok' // 'ok' | 'memory'
let resetDetected = false // s-a detectat și resetat progres corupt în acest page-load

// Verifică dacă localStorage chiar funcționează (set + get + remove).
function detectLocalStorage() {
  try {
    const t = '__ls_test__'
    window.localStorage.setItem(t, '1')
    window.localStorage.removeItem(t)
    return true
  } catch {
    return false
  }
}

const hasLS = detectLocalStorage()
if (!hasLS) mode = 'memory'

export function getStorageMode() {
  return mode
}

// Adevărat dacă în acest page-load am detectat și resetat progres corupt.
// (Persistă peste re-montarea dublă din React StrictMode, fiind la nivel de modul.)
export function wasResetDetected() {
  return resetDetected
}

// Încarcă progresul. Returnează { data, status }.
// `validate(obj)` -> boolean: confirmă că obiectul are forma așteptată.
export function loadProgress(validate) {
  if (mode === 'memory') {
    return { data: memoryStore, status: 'memory' }
  }
  let raw
  try {
    raw = window.localStorage.getItem(KEY)
  } catch {
    mode = 'memory'
    return { data: null, status: 'memory' }
  }

  if (raw == null) return { data: null, status: 'ok' }

  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    // JSON corupt -> resetăm
    safeRemove()
    resetDetected = true
    return { data: null, status: 'reset' }
  }

  if (typeof validate === 'function' && !validate(parsed)) {
    // schemă neașteptată -> resetăm
    safeRemove()
    resetDetected = true
    return { data: null, status: 'reset' }
  }

  return { data: parsed, status: 'ok' }
}

// Salvează progresul. Returnează statusul curent ('ok' | 'memory').
export function saveProgress(obj) {
  if (mode === 'memory') {
    memoryStore = obj
    return 'memory'
  }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(obj))
    return 'ok'
  } catch {
    // Cel mai probabil QuotaExceededError (localStorage plin) sau acces blocat.
    // Comutăm la memorie ca să nu pierdem sesiunea curentă.
    mode = 'memory'
    memoryStore = obj
    return 'memory'
  }
}

export function resetProgress() {
  memoryStore = null
  safeRemove()
}

function safeRemove() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* ignorăm */
  }
}
