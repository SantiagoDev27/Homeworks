export class DoctorNode {
    name: string;
    next: DoctorNode | null;
    constructor(name: string) {
        this.name = name;
        this.next = null;
    }
}
export class CircularDoctorList {
    head: DoctorNode | null;
    tail: DoctorNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }
    append(name: string): void {
        const newNode = new DoctorNode(name);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        } else if (this.tail) {
            this.tail.next = newNode;
            this.tail = newNode;
            this.tail.next = this.head;
        }
    }
}
export const getMockedDoctors = (): CircularDoctorList => {
    const doctorList = new CircularDoctorList();

    doctorList.append("Dra. Test1");
    doctorList.append("Dr. Test2");
    doctorList.append("Dr. Test3");
    doctorList.append("Dra. Test4");
    doctorList.append("Dr. Test5");

    return doctorList;
};