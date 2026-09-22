import React from 'react';
import type { Book } from '../types/Books';

interface BookStackDisplayProps {
    books: Book[];
    onPop: () => void;
    isEmpty: boolean;
}

export const BookStackDisplay: React.FC<BookStackDisplayProps> = ({ books, onPop, isEmpty }) => {
    return (
        <div className="stack-container">
            <h2>Pila Actual</h2>
            <button onClick={onPop} disabled={isEmpty} className="pop-btn">
                Desapilar (Pop)
            </button>

            <div className="books-list">
                {isEmpty ? (
                    <p>La pila está vacía.</p>
                ) : (
                    books.map((book, index) => (
                        <div key={book.isbn + index} className={`book-card ${index === 0 ? 'top-book' : ''}`}>
                            <div className="book-title">{book.name}</div>
                            <div className="book-details">
                                {book.author} | {book.editorial} | ISBN: {book.isbn}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};