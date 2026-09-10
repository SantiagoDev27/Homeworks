import { useState } from 'react';
import { patientList } from '../utils/patientList'; 
import { globalHistoryList } from '../utils/treatmentHistory';

export default function PatientViewer() {
    const [currentPatient, setCurrentPatient] = useState(patientList.head);
    const [listSize, setListSize] = useState(patientList.size());
    const handleAttend = () => {
        if (!currentPatient) return;
        const currentDate = new Date().toLocaleDateString();
        const defaultDescription = "este apartado esta en construccion";
        globalHistoryList.append(currentDate, defaultDescription, currentPatient.name);
        patientList.remove(currentPatient.name);
        setListSize(patientList.size());
        setCurrentPatient(currentPatient.next);
    };
    return (
        <div className="card">
            <header>
                <h2>Sala de Espera</h2>
                <span>{listSize} en espera</span>
            </header>
            {currentPatient ? (
                <div>
                    <p><strong>Turno actual:</strong> {currentPatient.name}</p>
                    <div className="buttons-container">
                        <button onClick={handleAttend}>
                            Atender Paciente
                        </button>
                    </div>
                </div>
            ) : (
                <p>No hay pacientes en espera.</p>
            )}
        </div>
    );
}