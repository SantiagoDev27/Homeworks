import { useState } from 'react'
import type { Person } from '../../types/graph'

interface Props {
  cities: string[]
  getPeopleByCity: (city: string) => Person[]
}

export default function CityPeople({ cities, getPeopleByCity }: Props) {
  const [selected, setSelected] = useState('')
  const city = selected || cities[0] || ''
  const residents = city ? getPeopleByCity(city) : []

  return (
    <div>
      <label htmlFor="city-select">Ver personas de la ciudad:</label>
      <select id="city-select" value={city} onChange={(e) => setSelected(e.target.value)}>
        {cities.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <ul>
        {residents.map((p) => (
          <li key={p.name}>
            {p.name} ({p.age} años)
          </li>
        ))}
        {residents.length === 0 && <li>Sin personas</li>}
      </ul>
    </div>
  )
}

