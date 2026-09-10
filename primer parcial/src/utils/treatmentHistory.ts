export class RecordNode {
    date: string;
    description: string;
    patientName: string;
    
    next: RecordNode | null;
    prev: RecordNode | null; 

    constructor(date: string, description: string, patientName: string) {
        this.date = date;
        this.description = description;
        this.patientName = patientName;
        this.next = null;
        this.prev = null;
    }
}

export class PatientHistoryList {
    head: RecordNode | null;
    tail: RecordNode | null;
    length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(date: string, description: string, patientName: string): void {
        const newNode = new RecordNode(date, description, patientName);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    size(): number {
        return this.length;
    }
}
export const getMockedHistory = (): PatientHistoryList => {
    const historyList = new PatientHistoryList();
    historyList.append("2026-01-10", "Consulta de rutina. Signos vitales normales.", "Ana García");
    historyList.append("2026-02-15", "Dolor de garganta y fiebre. Se receta amoxicilina.", "Mateo López");
    historyList.append("2026-03-05", "Control de fiebre. Paciente recuperado.", "Sofía Ruiz");
    historyList.append("2026-05-20", "Chequeo oftalmológico. Miopía leve, se recetan lentes.", "Daniel Flores");
    historyList.append("2026-06-12", "Dolor estomacal severo. Posible gastritis.", "Valentina Torres");
    historyList.append("2026-06-15", "Endoscopia realizada. Se confirma gastritis leve.", "Javier Ramírez");
    historyList.append("2026-07-01", "Control de gastritis. Mejora con cambio de dieta.", "Lucía Moreno");
    historyList.append("2026-09-10", "Vacunación anual contra la influenza.", "Sebastián Díaz");
    historyList.append("2026-11-22", "Esguince de tobillo derecho jugando fútbol.", "Camila Herrera");
    historyList.append("2026-11-29", "Control de esguince. Se retira vendaje, inicio fisioterapia.", "Andrés Navarro");
    historyList.append("2026-01-15", "Chequeo anual general. Exámenes de sangre solicitados.", "Renata Vega");
    historyList.append("2026-01-20", "Resultados de laboratorio: Colesterol ligeramente alto.", "Diego Castro");
    historyList.append("2026-03-10", "Dolor de cabeza crónico. Se deriva a neurología.", "María José Paredes");
    historyList.append("2026-04-05", "Evaluación neurológica. Diagnóstico de migraña por estrés.", "Tomás Silva");
    historyList.append("2026-06-18", "Control de migraña. Reducción de episodios con medicación.", "Paula Jiménez");
    historyList.append("2026-08-25", "Consulta dermatológica. Dermatitis por contacto en manos.", "Nicolás Ortega");
    historyList.append("2026-09-10", "Revisión de dermatitis. Curación completa con crema tópica.", "Isabella Rojas");
    historyList.append("2026-11-05", "Chequeo dental rutinario. Limpieza y profilaxis.", "Emiliano Salazar");
    historyList.append("2026-02-14", "Infección respiratoria alta. Tratamiento sintomático.", "Fernanda León");
    historyList.append("2026-03-01", "Alta médica por infección respiratoria. Paciente estable.", "Cristóbal Mendez");

    return historyList;
};

export const globalHistoryList = getMockedHistory();