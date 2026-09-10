export class CommitteeNode {
    name: string;
    role: string;
    next: CommitteeNode | null;
    prev: CommitteeNode | null;
    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
        this.next = null;
        this.prev = null;
    }
}
export class CircularDoublyCommitteeList {
    head: CommitteeNode | null;
    tail: CommitteeNode | null;
    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(name: string, role: string): void {
        const newNode = new CommitteeNode(name, role);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
        } else if (this.tail && this.head) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
            this.tail.next = this.head;
            this.head.prev = this.tail;
        }
    }
}
export const getMockedCommittee = (): CircularDoublyCommitteeList => {
    const committee = new CircularDoublyCommitteeList();
    
    committee.append("Admin 1", "Director Médico");
    committee.append("Admin 2", "Jefa de Cirugía");
    committee.append("Admin 3", "Administradora General");
    committee.append("Admin 4", "Decano de Medicina");
    return committee;
};