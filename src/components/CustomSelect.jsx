import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import './CustomSelect.css'

function CustomSelect({ id, label, placeholder, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handleClickOutside = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const selectOption = (option) => {
    onChange(option)
    setOpen(false)
  }

  return (
    <div className="cselect" ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`cselect__trigger ${open ? 'cselect__trigger--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? '' : 'cselect__placeholder'}>{value || placeholder}</span>
        <ChevronDown size={18} className="cselect__chevron" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="cselect__menu"
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`cselect__option ${value === option ? 'cselect__option--selected' : ''}`}
                  role="option"
                  aria-selected={value === option}
                  onClick={() => selectOption(option)}
                >
                  <span>{option}</span>
                  {value === option && <Check size={15} />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomSelect
