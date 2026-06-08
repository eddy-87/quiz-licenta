import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TYPEIN } from '../data/typein'
import { SECTIONS } from '../data/exercises'
import { Icon } from './Icon'

// Normalizare „iertătoare": fără diacritice, litere mici, fără punctuație, spații simple.
function norm(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function isMatch(input, answers) {
  const n = norm(input)
  if (!n) return false
  return answers.some((a) => {
    const na = norm(a)
    if (na.length <= 2 || n.length <= 2) return n === na // răspunsuri scurte: exact
    return n === na || n.includes(na) || na.includes(n) // altfel, potrivire parțială
  })
}

export default function Scrie() {
  const [section, setSection] = useState('all')
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState(false)
  const [result, setResult] = useState(null) // 'correct' | 'wrong'
  const [session, setSession] = useState({ seen: 0, correct: 0 })
  const inputRef = useRef(null)

  const list = useMemo(() => {
    return section === 'all' ? TYPEIN : TYPEIN.filter((t) => t.section === section)
  }, [section])

  const safeIndex = Math.min(index, Math.max(0, list.length - 1))
  const item = list[safeIndex]
  const secColor = (id) => SECTIONS.find((s) => s.id === id)?.color || '#94a3b8'
  const secName = (id) => SECTIONS.find((s) => s.id === id)?.name || id

  const changeSection = (id) => {
    setSection(id)
    setIndex(0)
    setInput('')
    setChecked(false)
    setResult(null)
  }

  const check = () => {
    if (checked || !item) return
    const ok = isMatch(input, item.answers)
    setResult(ok ? 'correct' : 'wrong')
    setChecked(true)
    setSession((s) => ({ seen: s.seen + 1, correct: s.correct + (ok ? 1 : 0) }))
  }

  const selfRight = () => {
    if (result === 'correct') return
    setResult('correct')
    setSession((s) => ({ ...s, correct: s.correct + 1 }))
  }

  const next = () => {
    setIndex((i) => (i + 1) % list.length) // reia ciclic
    setInput('')
    setChecked(false)
    setResult(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!checked) check()
      else next()
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-9">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Răspuns scris</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">Scrie din cap</h1>
        <p className="mt-1 text-slate-400">
          Tastează răspunsul, fără variante. Te forțează să-l produci singur — cea mai puternică formă de memorare.
        </p>
      </div>

      {/* filtru secțiune */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Chip active={section === 'all'} onClick={() => changeSection('all')} color="#ddb44c">
          Toate
        </Chip>
        {SECTIONS.map((s) => (
          <Chip key={s.id} active={section === s.id} onClick={() => changeSection(s.id)} color={s.color}>
            {s.name}
          </Chip>
        ))}
      </div>

      {item && (
        <>
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="card p-5 sm:p-6"
          >
            <div className="mb-3 flex items-center justify-between text-xs">
              <span
                className="rounded-full px-2 py-0.5 font-semibold"
                style={{ background: `${secColor(item.section)}22`, color: secColor(item.section), border: `1px solid ${secColor(item.section)}55` }}
              >
                {secName(item.section)}
              </span>
              <span className="text-slate-500">
                {session.correct}/{session.seen} corecte
              </span>
            </div>

            <h2 className="mb-4 text-lg font-bold leading-snug text-white sm:text-xl">{item.prompt}</h2>

            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={checked}
              autoFocus
              placeholder="Scrie răspunsul…"
              className={`w-full rounded-xl border bg-ink-950/70 px-4 py-3.5 text-base text-slate-100 outline-none transition
                placeholder:text-slate-600 focus:border-accent-400/70 focus:shadow-glow
                ${checked && result === 'correct' ? 'border-emerald-400/60' : ''}
                ${checked && result === 'wrong' ? 'border-rose-400/60' : 'border-white/10'}`}
            />

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 rounded-xl border p-4 ${
                  result === 'correct' ? 'border-emerald-400/40 bg-emerald-500/10' : 'border-rose-400/40 bg-rose-500/10'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {result === 'correct' ? (
                    <span className="inline-flex items-center gap-2 text-emerald-300">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20">
                        <Icon name="check" className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      Corect!
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-rose-300">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-400/20">
                        <Icon name="close" className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      Nu chiar
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-200">
                  Răspuns acceptat:{' '}
                  <span className="font-semibold text-emerald-300">{item.answers[0]}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  <span className="font-semibold text-slate-200">Explicație: </span>
                  {item.exp}
                </p>
                {result === 'wrong' && (
                  <button onClick={selfRight} className="mt-3 text-sm font-semibold text-accent-300 underline hover:text-accent-200">
                    De fapt am avut dreptate ✓
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>

          {!checked ? (
            <button onClick={check} className="btn-primary mt-4 w-full py-3.5 text-base">
              Verifică
            </button>
          ) : (
            <button onClick={next} className="btn-primary mt-4 w-full py-3.5 text-base">
              Următoarea <Icon name="arrow-right" className="h-5 w-5" />
            </button>
          )}

          <p className="mt-3 text-center text-xs text-slate-500">
            {safeIndex + 1} / {list.length} · apasă Enter pentru verifică / următoarea
          </p>
        </>
      )}
    </div>
  )
}

function Chip({ active, onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active ? 'text-ink-950' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
      }`}
      style={active ? { background: color, borderColor: color } : undefined}
    >
      {children}
    </button>
  )
}
