import { CITY_COLOR, FRIEND_COLOR, PERSON_COLOR, RESIDENCE_COLOR } from '../../utils/graphData'

const items = [
  { label: 'Ciudad', color: CITY_COLOR, shape: 'dot' },
  { label: 'Persona', color: PERSON_COLOR, shape: 'dot' },
  { label: 'Vive en', color: RESIDENCE_COLOR, shape: 'line' },
  { label: 'Amistad', color: FRIEND_COLOR, shape: 'line' },
]

export default function Legend() {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} aria-label="Leyenda del grafo">
      {items.map(({ label, color, shape }) => (
        <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              width: shape === 'dot' ? 14 : 24,
              height: shape === 'dot' ? 14 : 3,
              borderRadius: shape === 'dot' ? '50%' : 0,
              background: color,
            }}
          />
          {label}
        </li>
      ))}
    </ul>
  )
}

