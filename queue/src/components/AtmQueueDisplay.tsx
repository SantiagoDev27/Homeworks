import React from 'react';
import type { Person } from '../types/Person';

interface AtmQueueDisplayProps {
    queue: Person[];
    onDequeue: () => void;
    isEmpty: boolean;
}

export const AtmQueueDisplay: React.FC<AtmQueueDisplayProps> = ({ queue, onDequeue, isEmpty }) => {
    return (
        <div className="queue-container">
            <h2>Cola del Cajero Automático</h2>
            <button onClick={onDequeue} disabled={isEmpty} className="dequeue-btn">
                Atender Siguiente (Dequeue)
            </button>

            <div className="people-list">
                {isEmpty ? (
                    <p>No hay nadie en la cola.</p>
                ) : (
                    queue.map((person, index) => (
                        <div key={person.id} className={`person-card ${index === 0 ? 'being-served' : ''}`}>
                            <div className="person-header">
                                <span className="person-position">#{index + 1}</span>
                                <span className="person-name">{person.name}</span>
                            </div>
                            <div className="person-details">
                                <p><strong>Monto:</strong> ${person.withdrawalAmount.toLocaleString()}</p>
                                <p><strong>Llegada:</strong> {person.arrivalDate.toLocaleTimeString()}</p>
                            </div>
                            {index === 0 && <span className="serving-badge">En el cajero</span>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};