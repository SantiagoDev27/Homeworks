import { useState, useEffect } from 'react';
import { getMockedDoctors, DoctorNode } from '../utils/doctorRotation';

export default function DoctorRotation() {
    const [doctorList] = useState(getMockedDoctors);
    const [currentDoctor, setCurrentDoctor] = useState<DoctorNode | null>(doctorList.head);

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setCurrentDoctor((prevDoctor) => prevDoctor?.next || null);
        }, 10000);
        return () => clearInterval(rotationInterval);
    }, []);
    const handleNextManual = () => {
        if (currentDoctor?.next) {
            setCurrentDoctor(currentDoctor.next);
        }
    };
    return (
        <div className="card">
            <header>
                <p>Rotación continua</p>
            </header>
            {currentDoctor ? (
                <div>
                    <p>
                        <strong>En turno actual:</strong> {currentDoctor.name}
                    </p>
                    <p style={{ fontSize: '0.8em', color: 'gray' }}>
                        (Cambio automático cada 10 segundos)
                    </p>
                    
                    <button onClick={handleNextManual}>
                        Pasar al siguiente ahora
                    </button>
                </div>
            ) : (
                <p>No hay médicos asignados a la rotación.</p>
            )}
        </div>
    );
}