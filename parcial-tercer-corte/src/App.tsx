import { useMemo, useState } from 'react'
import { RankingPanel } from './components/RankingPanel'
import { RecommendationsPanel } from './components/RecommendationsPanel'
import { SearchPanel } from './components/SearchPanel'
import { initialRelations, initialSongs } from './data/initialSongs'
import { Graph } from './structures/Graph'
import { MaxHeap } from './structures/MaxHeap'
import { Trie } from './structures/Trie'
import type { Song } from './types/song'

export function App() {
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [relations, setRelations] =
    useState<[string, string][]>(initialRelations)
  const [selectedSongId, setSelectedSongId] = useState<string>(
    initialSongs[0].id,
  )
  const [topLimit, setTopLimit] = useState<number>(5)

  const trie = useMemo(() => {
    const instance = new Trie()
    for (const song of songs) {
      instance.insert(song.title)
    }
    return instance
  }, [songs])

  const maxHeap = useMemo(() => {
    const instance = new MaxHeap()
    for (const song of songs) {
      instance.insert(song)
    }
    return instance
  }, [songs])

  const graph = useMemo(() => {
    const instance = new Graph()
    for (const song of songs) {
      instance.addVertex(song.id)
    }
    for (const [songA, songB] of relations) {
      instance.addEdge(songA, songB)
    }
    return instance
  }, [songs, relations])

  const topSongs = maxHeap.getTop(topLimit)

  const selectedSong =
    songs.find((song) => song.id === selectedSongId) ?? songs[0] ?? null

  const relatedSongs = useMemo(() => {
    if (!selectedSong) {
      return []
    }
    const relatedIds = new Set(graph.getRelated(selectedSong.id))
    return songs.filter((song) => relatedIds.has(song.id))
  }, [graph, selectedSong, songs])

  const handleSelectSong = (song: Song) => {
    setSelectedSongId(song.id)
  }

  const handleAddSong = (title: string, artist: string, genre: string) => {
    const newSong: Song = {
      id: String(Date.now()),
      title,
      artist,
      genre,
      plays: 0,
    }
    setSongs((prev) => [...prev, newSong])
    setSelectedSongId(newSong.id)
  }

  const handlePlaySong = (songId: string) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === songId ? { ...song, plays: song.plays + 1 } : song,
      ),
    )
  }

  const handleConnectSongs = (songAId: string, songBId: string): boolean => {
    if (songAId === songBId || graph.hasEdge(songAId, songBId)) {
      return false
    }
    setRelations((prev) => [...prev, [songAId, songBId]])
    return true
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>Spotify</h1>
        <p>
          Plataforma de música con Trie, Max Heap y Grafo no dirigido ({songs.length}{' '}
          canciones)
        </p>
      </header>

      <div className="dashboard-grid">
        <SearchPanel
          trie={trie}
          songs={songs}
          onSelectSong={handleSelectSong}
          onAddSong={handleAddSong}
        />

        <RankingPanel
          topSongs={topSongs}
          topLimit={topLimit}
          totalSongs={songs.length}
          onChangeLimit={setTopLimit}
          onPlaySong={handlePlaySong}
          onSelectSong={handleSelectSong}
        />

        <RecommendationsPanel
          songs={songs}
          selectedSong={selectedSong}
          relatedSongs={relatedSongs}
          onSelectSong={handleSelectSong}
          onConnectSongs={handleConnectSongs}
        />
      </div>
    </main>
  )
}

export default App
