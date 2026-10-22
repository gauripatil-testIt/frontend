import { useEffect, useState } from 'react'
import { api } from './api.js'
import ActivityTab from './components/ActivityTab.jsx'

export default function App() {
  const [programs, setPrograms] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.listPrograms()
      .then((list) => {
        setPrograms(list)
        if (list.length) setSelectedId(list[0].id)
      })
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="app">
      <header>
        <h1>Vetting App</h1>
        <select value={selectedId ?? ''} onChange={(e) => setSelectedId(Number(e.target.value))}>
          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.type})
            </option>
          ))}
        </select>
      </header>
      {error && <p className="error">{error}</p>}
      {selectedId && <ActivityTab key={selectedId} programId={selectedId} />}
    </div>
  )
}
