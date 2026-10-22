import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import VettingAutomation from './VettingAutomation.jsx'
import RegistrationsTable from './RegistrationsTable.jsx'
import NewRegistrationForm from './NewRegistrationForm.jsx'

export default function ActivityTab({ programId }) {
  const [program, setProgram] = useState(null)
  const [registrations, setRegistrations] = useState([])
  const [error, setError] = useState(null)

  const reload = useCallback(
    () =>
      Promise.all([api.getProgram(programId), api.listRegistrations(programId)])
        .then(([p, r]) => {
          setProgram(p)
          setRegistrations(r)
        })
        .catch((e) => setError(e.message)),
    [programId],
  )

  useEffect(() => { reload() }, [reload])

  if (error) return <p className="error">{error}</p>
  if (!program) return <p>Loading…</p>

  return (
    <main>
      <VettingAutomation program={program} onChange={setProgram} />
      <NewRegistrationForm
        onSubmit={(body) => api.createRegistration(programId, body).then(reload).catch((e) => setError(e.message))}
      />
      <section className="card">
        <div className="row">
          <h2>Registrations</h2>
          <a href={api.exportUrl(programId)}>Export CSV</a>
        </div>
        <RegistrationsTable
          registrations={registrations}
          onRecalculate={(id) => api.recalculate(programId, id).then(reload).catch((e) => setError(e.message))}
        />
      </section>
    </main>
  )
}
