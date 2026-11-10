import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import type { element } from './types/element'
import Trie from './utils/trie_class'

const INITIAL_ELEMENTS: element[] = [
  { nombre: 'f-22 raptor', popularidad: 95 },
  { nombre: 'f-35 lightning', popularidad: 92 },
  { nombre: 'f-16 falcon', popularidad: 90 },
  { nombre: 'f-15 eagle', popularidad: 85 },
  { nombre: 'a-10 warthog', popularidad: 80 },
  { nombre: 'b-2 spirit', popularidad: 75 },
]

function App() {
  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState('')
  const [elements, setElements] = useState<element[]>(INITIAL_ELEMENTS)
  const [prefix, setPrefix] = useState('')
  const [k, setK] = useState('3')

  const parsedPopularidad = Number(popularidad)
  const newElement: element | null =
    nombre.trim() !== '' && popularidad.trim() !== '' && Number.isFinite(parsedPopularidad)
      ? { nombre: nombre.trim(), popularidad: parsedPopularidad }
      : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newElement) return
    setElements((prev) => [
      ...prev.filter((el) => el.nombre.toLowerCase() !== newElement.nombre.toLowerCase()),
      newElement,
    ])
    setNombre('')
    setPopularidad('')
  }

  const trie = useMemo(() => {
    const t = new Trie()
    elements.forEach((el) => t.insert(el.nombre, el.popularidad))
    return t
  }, [elements])

  const kValue = Math.max(1, Math.floor(Number(k)) || 1)
  const topResults = useMemo(() => trie.searchTopK(prefix, kValue), [trie, prefix, kValue])

  return (
    <>
      <section id='Main_content'>
        <h1> Busqueda de elementos populares</h1>
        <section id='Data_enter_section'>
          <h2 id='Data_enter_h3'> Introduce los datos</h2>
          <div id='Elements_enter_section'>
            <p> Ingreso de elementos </p>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Popularidad"
                  value={popularidad}
                  onChange={(e) => setPopularidad(e.target.value)}
                />
                <button type="submit" disabled={!newElement}>Agregar</button>
              </form>
              <ul>
                {elements.map((el, i) => (
                  <li key={i}>{el.nombre}: {el.popularidad}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section id='Search_section'>
          <h2>Buscar por prefijo</h2>
          <input
            type="text"
            placeholder="Prefijo"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
          <input
            type="number"
            min="1"
            placeholder="K"
            value={k}
            onChange={(e) => setK(e.target.value)}
          />
          <p>Top {kValue} más populares:</p>
          <ol>
            {topResults.map((el) => (
              <li key={el.nombre}>{el.nombre}: {el.popularidad}</li>
            ))}
            {topResults.length === 0 && <li>Sin resultados</li>}
          </ol>
        </section>
      </section>
    </>
  )
}

export default App
