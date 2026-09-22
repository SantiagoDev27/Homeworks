import { useState } from 'react';
import type { Person } from '../types/Person';

const getRandomRecentDate = () => {
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;
    return new Date(twoHoursAgo + Math.random() * (now - twoHoursAgo));
};

const MOCK_PEOPLE: Person[] = [
    { id: '1', name: "Ana Silva", withdrawalAmount: 200000, arrivalDate: getRandomRecentDate() },
    { id: '2', name: "Carlos Perez", withdrawalAmount: 50000, arrivalDate: getRandomRecentDate() },
    { id: '3', name: "Luisa Gomez", withdrawalAmount: 800000, arrivalDate: getRandomRecentDate() }
].sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime()); 

export const useAtmQueue = () => {
    const [queue, setQueue] = useState<Person[]>(MOCK_PEOPLE);

    const enqueue = (name: string, amount: number) => {
        const newPerson: Person = {
            id: crypto.randomUUID(),
            name,
            withdrawalAmount: amount,
            arrivalDate: getRandomRecentDate() 
        };

        setQueue((prevQueue) => {
            const updatedQueue = [...prevQueue, newPerson];
            return updatedQueue.sort((a, b) => a.arrivalDate.getTime() - b.arrivalDate.getTime());
        });
    };

    const dequeue = () => {
        setQueue((prevQueue) => prevQueue.slice(1));
    };

    return {
        queue,
        enqueue,
        dequeue,
        isEmpty: queue.length === 0
    };
};