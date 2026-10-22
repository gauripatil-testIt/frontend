import { useState } from 'react'

/**
 * Reusable toggle row: immediate save, optimistic update, reverts and shows an error if the save fails.
 * `disabled` greys the row out (master toggle off); `readOnly` is for users without edit permission.
 */
export default function ToggleRow({ label, subtext, checked, onSave, disabled = false, readOnly = false }) {
  const [value, setValue] = useState(checked)
  const [error, setError] = useState(null)

  const inactive = disabled || readOnly

  async function toggle() {
    if (inactive) return
    const next = !value
    setValue(next)
    setError(null)
    try {
      await onSave(next)
    } catch (e) {
      setValue(!next)
      setError('Could not save. Please try again.')
    }
  }

  return (
    <div className={`toggle-row ${disabled ? 'disabled' : ''}`}>
      <div>
        <div className="toggle-label">{label}</div>
        {subtext && <div className="toggle-subtext">{subtext}</div>}
        {error && <div className="error">{error}</div>}
      </div>
      <button
        role="switch"
        aria-checked={value}
        aria-label={label}
        disabled={inactive}
        className={`switch ${value ? 'on' : ''}`}
        onClick={toggle}
      >
        <span className="knob" />
      </button>
    </div>
  )
}
