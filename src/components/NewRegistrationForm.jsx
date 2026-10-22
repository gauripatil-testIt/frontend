import { useState } from 'react'

const empty = {
  email: '', company: '', contactCountry: '', contactState: '', companyHqCountry: '', companyHqState: '',
  score: 60, suppression: false, exclusion: false, unmatched: '',
}

/** Dev helper: creates a registration and lets you simulate what the AI scorer returns. */
export default function NewRegistrationForm({ onSubmit }) {
  const [f, setF] = useState(empty)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  function submit(e) {
    e.preventDefault()
    const { score, suppression, exclusion, unmatched, ...rest } = f
    onSubmit({
      ...rest,
      simulate: {
        score: Number(score),
        suppression,
        exclusion,
        unmatched: unmatched.split(',').map((s) => s.trim()).filter(Boolean),
      },
    })
    setF(empty)
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>New registration (simulated scoring)</h2>
      <input placeholder="Email" value={f.email} onChange={set('email')} required />
      <input placeholder="Company" value={f.company} onChange={set('company')} />
      <input placeholder="Contact country" value={f.contactCountry} onChange={set('contactCountry')} />
      <input placeholder="Contact state" value={f.contactState} onChange={set('contactState')} />
      <input placeholder="Company HQ country" value={f.companyHqCountry} onChange={set('companyHqCountry')} />
      <input placeholder="Company HQ state" value={f.companyHqState} onChange={set('companyHqState')} />
      <label>Score <input type="number" min="0" max="100" value={f.score} onChange={set('score')} /></label>
      <label><input type="checkbox" checked={f.suppression} onChange={set('suppression')} /> Suppression match</label>
      <label><input type="checkbox" checked={f.exclusion} onChange={set('exclusion')} /> Exclusion match</label>
      <input
        placeholder="Unmatched criteria, comma separated (e.g. Contact State, Job Title)"
        value={f.unmatched}
        onChange={set('unmatched')}
      />
      <button type="submit">Create &amp; score</button>
    </form>
  )
}
