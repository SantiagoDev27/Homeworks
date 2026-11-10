import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import type { element } from './types/element'

function App() {
  const [nombre, setNombre] = useState('')
  const [popularidad, setPopularidad] = useState('')
  const [elements, setElements] = useState<element[]>([])

  // Solo es un element válido si ambos campos tienen datos y cumplen el tipo
  const parsedPopularidad = Number(popularidad)
  const newElement: element | null =
    nombre.trim() !== '' && popularidad.trim() !== '' && Number.isFinite(parsedPopularidad)
      ? { nombre: nombre.trim(), popularidad: parsedPopularidad }
      : null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!newElement) return
    setElements((prev) => [...prev, newElement])
    setNombre('')
    setPopularidad('')
  }

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
      </section>
    </>
  )
}

export default App
