import { useState } from 'react';
import { getMockedCommittee, CommitteeNode } from '../utils/administrativecommittee';

export default function CommitteeViewer() {
    const [committeeList] = useState(getMockedCommittee);
    const [currentMember, setCurrentMember] = useState<CommitteeNode | null>(committeeList.head);

    const handleNext = () => {
        if (currentMember?.next) {
            setCurrentMember(currentMember.next);
        }
    };
    const handlePrev = () => {
        if (currentMember?.prev) {
            setCurrentMember(currentMember.prev);
        }
    };
    return (
        <div className="card">
            {currentMember ? (
                <div>
                    <p>
                        <strong>Nombre:</strong> {currentMember.name}
                    </p>
                    <p>
                        <strong>Cargo:</strong> {currentMember.role}
                    </p>
                    
                    <div className="buttons-container">
                        <button onClick={handlePrev}>
                            ⬅ Miembro Anterior
                        </button>
                        <button onClick={handleNext}>
                            Miembro Siguiente ➡
                        </button>
                    </div>
                </div>
            ) : (
                <p>No hay miembros en el comité.</p>
            )}
        </div>
    );
}