import { useState } from 'react';
import { globalHistoryList, RecordNode } from '../utils/treatmentHistory';

export default function TreatmentHistory() {
    const [currentRecord, setCurrentRecord] = useState<RecordNode | null>(globalHistoryList.tail);
    const handleOlder = () => {
        if (currentRecord?.prev) {
            setCurrentRecord(currentRecord.prev);
        }
    };
    const handleNewer = () => {
        if (currentRecord?.next) {
            setCurrentRecord(currentRecord.next);
        }
    };
    const handleRefresh = () => {
        setCurrentRecord(globalHistoryList.tail);
    };
    return (
        <div className="card">
            <header >
            </header>
            {currentRecord ? (
                <div>
                    <p>
                        <strong>Fecha: {currentRecord.date}</strong>
                    </p>
                    <p>
                        <strong>Paciente: {currentRecord.patientName}</strong>
                    </p>
                    <div>
                        <p>{currentRecord.description}</p>
                    </div>
                    <div className="buttons-container">
                        <button
                            onClick={handleOlder}
                            disabled={!currentRecord.prev}
                        >
                            ⬅ Anterior
                        </button>
                        <button
                            onClick={handleNewer}
                            disabled={!currentRecord.next}
                        >
                            Siguiente ➡
                        </button>
                        <button onClick={handleRefresh}>Actualizar Vista</button>
                    </div>
                </div>
            ) : (
                <p>No hay registros disponibles.</p>
            )}
        </div>
    );
}