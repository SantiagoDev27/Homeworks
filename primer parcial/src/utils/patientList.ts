export class PatientNode {
    name: string;
    next: PatientNode | null;

    constructor(name: string){
        this.name = name;
        this.next = null;
    }
}

class LinkedListPatient {
    head: PatientNode | null;
    tail: PatientNode | null;
    length: number;

    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(name: string): void {
        const newNode = new PatientNode(name);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
    }

    peek(name: string): PatientNode | null {
        let current = this.head;
        while (current){
            if (current.name === name){
                return current;
            }
            current = current.next;
        }
        return null;
    }

    size(): number {
        return this.length;
    }

    remove(name: string): void {
        if (!this.head) return;


        if (this.head.name === name){
            this.head = this.head.next;
            if (!this.head){ 
                this.tail = null;
            }
            this.length--;
            return;
        }

        let current = this.head;
        while (current.next && current.next.name !== name){
            current = current.next;
        }

        if (current.next){
            if (current.next === this.tail) {
                this.tail = current;
            }
            current.next = current.next.next;
            this.length--;
        }
    }

    print(): void {
        let current = this.head;
        let result = '';
        while (current){
            result += current.name + ' -> ';
            current = current.next;
        }
        console.log(result + "null");
    }
}

const mockPatientNames: string[] = [
    "Juan Perez", "Maria Gomez", "Carlos Rodriguez", "Ana Lopez", 
    "Luis Fernandez", "Carmen Martinez", "Jose Garcia", "Laura Sanchez", 
    "Pedro Diaz", "Sofia Romero", "Miguel Torres", "Elena Ruiz", 
    "Jorge Ramirez", "Lucia Flores", "Diego Herrera", "Valeria Cruz", 
    "Andres Morales", "Paula Ortiz", "Fernando Castillo", "Camila Jimenez"
];

export const patientList = new LinkedListPatient();


mockPatientNames.forEach(name => patientList.append(name));

export const getFirstPatient = (): PatientNode | null => {
    return patientList.head;
};

