import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Trie } from '../structures/Trie'
import type { Song } from '../types/song'

interface SearchPanelProps {
  trie: Trie
  songs: Song[]
  onSelectSong: (song: Song) => void
  onAddSong: (title: string, artist: string, genre: string) => void
}

export function SearchPanel({
  trie,
  songs,
  onSelectSong,
  onAddSong,
}: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const [searchResult, setSearchResult] = useState('')
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [addMessage, setAddMessage] = useState('')

  const suggestions = trie.getSuggestions(query)

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const cleanQuery = query.trim()
    if (!cleanQuery) {
      setSearchResult('Escribe el título de una canción para buscar.')
      return
    }

    const exists = trie.search(cleanQuery)
    if (exists) {
      const found = songs.find(
        (song) => song.title.toLowerCase() === cleanQuery.toLowerCase(),
      )
      if (found) {
        onSelectSong(found)
      }
      setSearchResult(`La canción "${cleanQuery}" existe en el catálogo.`)
    } else {
      setSearchResult(`La canción "${cleanQuery}" no está registrada.`)
    }
  }

  const handlePickSuggestion = (suggestedTitle: string) => {
    setQuery(suggestedTitle)
    setSearchResult(`Canción seleccionada: "${suggestedTitle}".`)
    const found = songs.find(
      (song) => song.title.toLowerCase() === suggestedTitle.toLowerCase(),
    )
    if (found) {
      onSelectSong(found)
    }
  }

  const handleAdd = (event: FormEvent) => {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanArtist = artist.trim()
    const cleanGenre = genre.trim()

    if (!cleanTitle || !cleanArtist || !cleanGenre) {
      setAddMessage('Completa título, artista y género.')
      return
    }

    if (trie.search(cleanTitle)) {
      setAddMessage(`La canción "${cleanTitle}" ya existe en el catálogo.`)
      return
    }

    onAddSong(cleanTitle, cleanArtist, cleanGenre)
    setTitle('')
    setArtist('')
    setGenre('')
    setAddMessage(`Canción "${cleanTitle}" agregada correctamente.`)
  }

  return (
    <section className="panel panel-search">
      <h2>Buscador Predictivo (Trie)</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="song-search">Buscar canción por título o prefijo</label>
        <div className="search-controls">
          <input
            id="song-search"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSearchResult('')
            }}
            placeholder="Ej. B, Blinding, In..."
          />
          <button type="submit">Buscar</button>
        </div>
      </form>

      {searchResult && <p className="feedback">{searchResult}</p>}

      {query.trim() !== '' && (
        <div className="suggestions-box">
          <h3>Sugerencias</h3>
          {suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {suggestions.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="suggestion-button"
                    onClick={() => handlePickSuggestion(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">No hay coincidencias para ese prefijo.</p>
          )}
        </div>
      )}

      <form className="add-song-form" onSubmit={handleAdd}>
        <h3>Agregar canción</h3>

        <div className="form-field">
          <label htmlFor="new-title">Título</label>
          <input
            id="new-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Título de la canción"
          />
        </div>

        <div className="form-field">
          <label htmlFor="new-artist">Artista</label>
          <input
            id="new-artist"
            type="text"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            placeholder="Nombre del artista"
          />
        </div>

        <div className="form-field">
          <label htmlFor="new-genre">Género</label>
          <input
            id="new-genre"
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            placeholder="Ej. Rock, Pop, Jazz"
          />
        </div>

        <button type="submit">Agregar al catálogo</button>
      </form>

      {addMessage && <p className="feedback">{addMessage}</p>}
    </section>
  )
}
