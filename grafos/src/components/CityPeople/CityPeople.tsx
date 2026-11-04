import type { Person } from '../../types/graph'

interface Props {
  cities: string[]
  getPeopleByCity: (city: string) => Person[]
  /** '' = ver todos */
  selected: string
  onSelect: (city: string) => void
}

export default function CityPeople({ cities, getPeopleByCity, selected, onSelect }: Props) {
  // Con "Ver todos" se listan todas las ciudades; si no, solo la elegida.
  const shown = selected ? [selected] : cities

  return (
    <div>
      <label htmlFor="city-select">Ver ciudad:</label>
      <select id="city-select" value={selected} onChange={(e) => onSelect(e.target.value)}>
        <option value="">Ver todos</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {shown.map((city) => {
        const residents = getPeopleByCity(city)
        return (
          <div key={city}>
            <strong>{city}</strong>
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
      })}
    </div>
  )
}
