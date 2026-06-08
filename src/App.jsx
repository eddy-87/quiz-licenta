import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useProgress } from './hooks/useProgress'
import { QUESTIONS } from './data/questions'
import { weakPool } from './lib/selection'
import StorageBanner from './components/StorageBanner'
import Shell from './components/Shell'
import Dashboard from './components/Dashboard'
import Quiz from './components/Quiz'
import Exam from './components/Exam'
import Stats from './components/Stats'
import Subiecte from './components/Subiecte'

export default function App() {
  const { progress, storageStatus, answer, reset, acknowledgeStatus } = useProgress()
  const [screen, setScreen] = useState('dashboard') // dashboard | stats | practice | weak | exam
  const [chapterId, setChapterId] = useState(null)

  const weakCount = useMemo(() => weakPool(QUESTIONS, progress, 2).length, [progress])

  const go = (s) => {
    setChapterId(null)
    setScreen(s)
  }
  const startNormal = () => {
    setChapterId(null)
    setScreen('practice')
  }
  const startWeak = () => {
    setChapterId(null)
    setScreen('weak')
  }
  const startChapter = (id) => {
    setChapterId(id)
    setScreen('practice')
  }

  // Ecranele „focus" ocupă tot spațiul, fără navigația persistentă.
  const focused = screen === 'practice' || screen === 'weak' || screen === 'exam'

  let content = null
  if (screen === 'dashboard')
    content = (
      <Dashboard
        progress={progress}
        weakCount={weakCount}
        onStartNormal={startNormal}
        onStartWeak={startWeak}
        onStartChapter={startChapter}
        onNavigate={go}
      />
    )
  else if (screen === 'stats') content = <Stats progress={progress} onReset={reset} />
  else if (screen === 'subiecte') content = <Subiecte />
  else if (screen === 'practice')
    content = <Quiz mode="normal" chapterId={chapterId} progress={progress} onAnswer={answer} onExit={() => go('dashboard')} />
  else if (screen === 'weak')
    content = <Quiz mode="weak" progress={progress} onAnswer={answer} onExit={() => go('dashboard')} />
  else if (screen === 'exam') content = <Exam onAnswer={answer} onExit={() => go('dashboard')} />

  const inner = (
    <>
      <div className="pt-4">
        <StorageBanner status={storageStatus} onDismiss={acknowledgeStatus} />
      </div>
      {/* Tranziție simplă pe schimbarea ecranului (fără AnimatePresence
          mode="wait", care bloca tranzițiile între ecranele din shell). */}
      <motion.div
        key={screen + (chapterId ?? '')}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
      >
        {content}
      </motion.div>
    </>
  )

  if (focused) return <div className="min-h-full">{inner}</div>

  return (
    <Shell active={screen} onNavigate={go} progress={progress}>
      {inner}
    </Shell>
  )
}
