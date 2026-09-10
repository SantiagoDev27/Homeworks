import PatientViewer from './PatientList';
import TreatmentHistory from './TreatmentHistory';
import DoctorRotation from './doctorRotation';
import CommitteeViewer from './administrativeCommittee';

function serviceList() {
    return (
        <>
            <div>
                <h2>Gestion de pacientes en espera</h2>
                <PatientViewer />
            </div>
            <div>
                <h2>Historial de atención</h2>
                <TreatmentHistory />
            </div>
            <div>
                <h2>Médico de Guardia</h2>
                <DoctorRotation/>
            </div>
            <div>
                <h2>Comite administrativo</h2>
                <CommitteeViewer />
            </div>
        </>
    )
}

export default serviceList