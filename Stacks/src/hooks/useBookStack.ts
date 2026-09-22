import { useState } from 'react';
import type { Book } from '../types/Books';

const MOCK_BOOKS: Book[] = [
    { isbn: "978-0132350884", name: "Clean Code", author: "Robert C. Martin", editorial: "Prentice Hall" },
    { isbn: "978-0201633610", name: "Design Patterns", author: "Erich Gamma et al.", editorial: "Addison-Wesley" }
];

export const useBookStack = () => {

    const [stack, setStack] = useState<Book[]>(MOCK_BOOKS);

    const pushBook = (newBook: Book) => {
        setStack((prevStack) => [...prevStack, newBook]);
    };


    const popBook = () => {
        setStack((prevStack) => prevStack.slice(0, -1));
    };

    const getReversedStack = () => {
        return [...stack].reverse();
    };

    return {
        stack,
        pushBook,
        popBook,
        getReversedStack,
        isEmpty: stack.length === 0
    };
};