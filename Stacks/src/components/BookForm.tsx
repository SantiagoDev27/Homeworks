import React, { useState } from 'react';
import type { Book } from '../types/Books';

interface BookFormProps {
    onAddBook: (book: Book) => void;
}

export const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
    const [formData, setFormData] = useState<Book>({
        name: '',
        isbn: '',
        author: '',
        editorial: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.isbn || !formData.author || !formData.editorial) return;

        onAddBook(formData);

        // Limpiar el formulario
        setFormData({ name: '', isbn: '', author: '', editorial: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <h2>Añadir a la Pila</h2>
            <div className="input-group">
                <label>Nombre del Libro</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label>ISBN</label>
                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label>Autor</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label>Editorial</label>
                <input type="text" name="editorial" value={formData.editorial} onChange={handleChange} required />
            </div>
            <button type="submit">Apilar Libro (Push)</button>
        </form>
    );
};