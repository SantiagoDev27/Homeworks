import { useState } from 'react'
import type { FormEvent } from 'react'

interface Props {
  cities: string[]
  people: string[]
  onAddCity: (name: string) => boolean
  onAddPerson: (name: string, age: number, city: string) => boolean
  onAddFriendship: (a: string, b: string) => boolean
}

export default function GraphForm({ cities, people, onAddCity, onAddPerson, onAddFriendship }: Props) {
  const [cityName, setCityName] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [friendA, setFriendA] = useState('')
  const [friendB, setFriendB] = useState('')
  const [message, setMessage] = useState('')

  const report = (ok: boolean, text: string) => setMessage(ok ? '' : text)

  const submitCity = (e: FormEvent) => {
    e.preventDefault()
    report(onAddCity(cityName), 'Ciudad inválida o ya existe')
    setCityName('')
  }

  const submitPerson = (e: FormEvent) => {
    e.preventDefault()
    const ok = onAddPerson(name, Number(age), city || cities[0])
    report(ok, 'Persona inválida, repetida o sin ciudad')
    if (ok) {
      setName('')
      setAge('')
    }
  }

  const submitFriendship = (e: FormEvent) => {
    e.preventDefault()
    report(
      onAddFriendship(friendA || people[0], friendB || people[1]),
      'Amistad inválida o ya existe',
    )
  }

  return (
    <>
      <form onSubmit={submitCity}>
        <label htmlFor="city-name">Ciudad:</label>
        <input id="city-name" value={cityName} onChange={(e) => setCityName(e.target.value)} />
        <button type="submit">Agregar ciudad</button>
      </form>

      <form onSubmit={submitPerson}>
        <label htmlFor="person-name">Persona:</label>
        <input id="person-name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
        <input id="person-age" type="number" min="1" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} />
        <select value={city || cities[0] || ''} onChange={(e) => setCity(e.target.value)}>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button type="submit">Agregar persona</button>
      </form>

      <form onSubmit={submitFriendship}>
        <label>Amistad:</label>
        <select value={friendA || people[0] || ''} onChange={(e) => setFriendA(e.target.value)}>
          {people.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select value={friendB || people[1] || ''} onChange={(e) => setFriendB(e.target.value)}>
          {people.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button type="submit">Agregar amistad</button>
      </form>

      {message && <p role="alert">{message}</p>}
    </>
  )
}
