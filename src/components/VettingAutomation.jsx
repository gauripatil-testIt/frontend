import { api } from '../api.js'
import ToggleRow from './ToggleRow.jsx'

export default function VettingAutomation({ program, onChange }) {
  const s = program.vettingSettings
  const save = (field) => async (value) => {
    const updated = await api.updateVettingSettings(program.id, { [field]: value })
    onChange(updated)
  }
  const masterOff = !s.vettingAutomationEnabled

  return (
    <section className="card">
      <h2>Vetting Automation</h2>
      <ToggleRow
        label="Vetting Automation"
        subtext="Master switch for all automations below."
        checked={s.vettingAutomationEnabled}
        onSave={save('vettingAutomationEnabled')}
      />
      <ToggleRow
        label="Auto Approve 100%"
        subtext="Automatically approve leads that score 100%."
        checked={s.autoApprove100}
        onSave={save('autoApprove100')}
        disabled={masterOff}
      />
      <ToggleRow
        label="Auto DQ"
        subtext="Automatically disqualify leads with a 0% score, suppression match or exclusion match."
        checked={s.autoDq}
        onSave={save('autoDq')}
        disabled={masterOff}
      />
      {/* Geo Location Toggle story: add the "Auto DQ - Geo Location" row here (Syndication only). */}
    </section>
  )
}
