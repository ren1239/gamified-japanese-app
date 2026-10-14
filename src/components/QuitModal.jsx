import { AnimatePresence, motion } from 'framer-motion'
import Mascot from './Mascot'

export default function QuitModal({ show, onCancel, onQuit, onSubmit }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            key="quit-backdrop"
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
          />
          <motion.div
            key="quit-modal"
            className="sheet"
            role="dialog"
            aria-label="Quit lesson?"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            style={{ textAlign: 'center', justifyItems: 'center' }}
          >
            <Mascot who="nori" mood="oops" size={96} />
            <div>
              <div className="sheet-title" style={{ fontFamily: 'var(--font-ui)', fontWeight: 900 }}>Leave this lesson?</div>
              <p className="sheet-body">If you quit now, your answers and XP from this lesson won&apos;t be saved.</p>
            </div>
            <div style={{ display: 'grid', gap: 12, width: '100%' }}>
              <button type="button" className="btn btn-lg btn-primary" onClick={onCancel}>Keep going</button>
              <button type="button" className="btn btn-lg btn-ghost" onClick={onSubmit}>Finish & see score</button>
              <button type="button" className="btn btn-lg btn-danger" onClick={onQuit}>Quit</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
