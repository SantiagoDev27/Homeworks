import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Song } from '../types/song'

interface RecommendationsPanelProps {
  songs: Song[]
  selectedSong: Song | null
  relatedSongs: Song[]
  onSelectSong: (song: Song) => void
  onConnectSongs: (songAId: string, songBId: string) => boolean
}

export function RecommendationsPanel({
  songs,
  selectedSong,
  relatedSongs,
  onSelectSong,
  onConnectSongs,
}: RecommendationsPanelProps) {
  const [songAId, setSongAId] = useState(songs[0]?.id ?? '')
  const [songBId, setSongBId] = useState(songs[1]?.id ?? '')
  const [relationMessage, setRelationMessage] = useState('')

  const handleSelectActive = (songId: string) => {
    const found = songs.find((song) => song.id === songId)
    if (found) {
      onSelectSong(found)
    }
  }

  const handleConnect = (event: FormEvent) => {
    event.preventDefault()

    if (!songAId || !songBId) {
      setRelationMessage('Selecciona dos canciones para conectar.')
      return
    }

    if (songAId === songBId) {
      setRelationMessage('Debes elegir dos canciones distintas.')
      return
    }

    const created = onConnectSongs(songAId, songBId)
    if (created) {
      setRelationMessage('Conexión bidireccional agregada al grafo.')
    } else {
      setRelationMessage('Esas dos canciones ya están conectadas.')
    }
  }

  return (
    <section className="panel panel-recommendations">
      <h2>Recomendaciones (Grafo no dirigido)</h2>

      <div className="active-song-selector">
        <label htmlFor="active-song">Canción seleccionada:</label>
        <select
          id="active-song"
          value={selectedSong?.id ?? ''}
          onChange={(event) => handleSelectActive(event.target.value)}
        >
          {songs.map((song) => (
            <option key={song.id} value={song.id}>
              {song.title} — {song.artist}
            </option>
          ))}
        </select>
      </div>

      {selectedSong && (
        <div className="related-box">
          <h3>
            Relacionadas con {selectedSong.title} ({relatedSongs.length})
          </h3>

          {relatedSongs.length > 0 ? (
            <ul className="related-list">
              {relatedSongs.map((song) => (
                <li key={song.id} className="related-item">
                  <button type="button" onClick={() => onSelectSong(song)}>
                    {song.title} — {song.artist} ({song.genre})
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-state">
              Esta canción aún no tiene canciones relacionadas.
            </p>
          )}
        </div>
      )}

      <form className="connect-form" onSubmit={handleConnect}>
        <h3>Conectar canciones relacionadas</h3>

        <div className="form-field">
          <label htmlFor="connect-song-a">Canción A</label>
          <select
            id="connect-song-a"
            value={songAId}
            onChange={(event) => setSongAId(event.target.value)}
          >
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="connect-song-b">Canción B</label>
          <select
            id="connect-song-b"
            value={songBId}
            onChange={(event) => setSongBId(event.target.value)}
          >
            {songs.map((song) => (
              <option key={song.id} value={song.id}>
                {song.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Conectar</button>
      </form>

      {relationMessage && <p className="feedback">{relationMessage}</p>}
    </section>
  )
}
