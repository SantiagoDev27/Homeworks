import type { Song } from '../types/song'

interface RankingPanelProps {
  topSongs: Song[]
  topLimit: number
  totalSongs: number
  onChangeLimit: (limit: number) => void
  onPlaySong: (songId: string) => void
  onSelectSong: (song: Song) => void
}

export function RankingPanel({
  topSongs,
  topLimit,
  totalSongs,
  onChangeLimit,
  onPlaySong,
  onSelectSong,
}: RankingPanelProps) {
  return (
    <section className="panel panel-ranking">
      <div className="panel-header">
        <h2>Canciones populares (Max Heap)</h2>
        <div className="limit-control">
          <label htmlFor="top-limit">Mostrar:</label>
          <select
            id="top-limit"
            value={topLimit}
            onChange={(event) => onChangeLimit(Number(event.target.value))}
          >
            <option value={3}>TOP 3</option>
            <option value={5}>TOP 5</option>
            <option value={10}>TOP 10</option>
            {totalSongs > 10 && (
              <option value={totalSongs}>Todas ({totalSongs})</option>
            )}
          </select>
        </div>
      </div>

      <ol className="ranking-list">
        {topSongs.map((song, index) => (
          <li key={song.id} className="ranking-item">
            <div className="song-info">
              <span className="position">#{index + 1}</span>
              <strong className="song-title">{song.title}</strong>
              <span className="song-meta">
                {song.artist} · {song.genre}
              </span>
              <span className="song-plays">{song.plays} reproducciones</span>
            </div>

            <div className="song-actions">
              <button type="button" onClick={() => onPlaySong(song.id)}>
                Reproducir (+1)
              </button>
              <button type="button" onClick={() => onSelectSong(song)}>
                Ver relacionadas
              </button>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
