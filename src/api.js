async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`${options.method || 'GET'} ${path} failed: ${res.status}`)
  const type = res.headers.get('content-type') || ''
  return type.includes('json') ? res.json() : res.text()
}

export const api = {
  listPrograms: () => request('/programs'),
  getProgram: (id) => request(`/programs/${id}`),
  updateVettingSettings: (id, patch) =>
    request(`/programs/${id}/vetting-settings`, { method: 'PATCH', body: JSON.stringify(patch) }),
  listRegistrations: (id) => request(`/programs/${id}/registrations`),
  createRegistration: (id, body) =>
    request(`/programs/${id}/registrations`, { method: 'POST', body: JSON.stringify(body) }),
  recalculate: (programId, regId, simulate) =>
    request(`/programs/${programId}/registrations/${regId}/recalculate`, {
      method: 'POST',
      body: JSON.stringify(simulate || {}),
    }),
  exportUrl: (id) => `/api/programs/${id}/registrations/export`,
}
