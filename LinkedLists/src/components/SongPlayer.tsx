import { useState } from 'react';
import { getMockedSongs, SongNode } from '../utils/list';

export default function SongPlayer() {
    const [currentSong, setCurrentSong] = useState<SongNode | null>(getMockedSongs());

    const handleNext = () => {
        if (currentSong?.next) {
            setCurrentSong(currentSong.next);
        }
    };

    return (
        <div className="card">
            <h2>Reproductor (Linked List)</h2>
            <p><strong>Escuchando:</strong> {currentSong ? currentSong.title : 'End of Playlist'}</p>
            <button
                onClick={handleNext}
                disabled={!currentSong?.next}
            >
                Siguiente Canción
            </button>
        </div>
    );
}