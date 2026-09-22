import React, { useState } from 'react';

interface PersonFormProps {
    onEnqueue: (name: string, amount: number) => void;
}

export const PersonForm: React.FC<PersonFormProps> = ({ onEnqueue }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number | ''>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount) return;

        onEnqueue(name, Number(amount));

        setName('');
        setAmount('');
    };

    return (
        <form onSubmit={handleSubmit} className="queue-form">
            <h2>Ingresar a la Cola del Cajero</h2>
            <div className="input-group">
                <label>Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
                <label>Monto a Retirar ($)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    min="10"
                    step="10"
                />
            </div>
            <button type="submit" className="enqueue-btn">Formarse (Enqueue)</button>
        </form>
    );
};