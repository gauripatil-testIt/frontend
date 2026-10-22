export default function RegistrationsTable({ registrations, onRecalculate }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th><th>Email</th><th>Company</th><th>Contact</th><th>HQ</th>
          <th>Status</th><th>Score</th><th>Note</th><th></th>
        </tr>
      </thead>
      <tbody>
        {registrations.map((r) => (
          <tr key={r.id}>
            <td>{r.id}</td>
            <td>{r.email}</td>
            <td>{r.company}</td>
            <td>{[r.contactState, r.contactCountry].filter(Boolean).join(', ')}</td>
            <td>{[r.companyHqState, r.companyHqCountry].filter(Boolean).join(', ')}</td>
            <td><span className={`status ${r.status}`}>{r.status}</span></td>
            <td>{r.aiScore ?? 'N/A'}</td>
            <td>{r.vettingNote}</td>
            <td><button onClick={() => onRecalculate(r.id)}>Recalculate</button></td>
          </tr>
        ))}
        {registrations.length === 0 && (
          <tr><td colSpan="9">No registrations yet.</td></tr>
        )}
      </tbody>
    </table>
  )
}
