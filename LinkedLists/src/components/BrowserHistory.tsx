import { useState } from 'react';
import { getMockedHistory, PageNode } from '../utils/list';

export default function BrowserHistory() {
    const [currentPage, setCurrentPage] = useState<PageNode | null>(getMockedHistory());

    const handleBack = () => {
        if (currentPage?.prev) setCurrentPage(currentPage.prev);
    };

    const handleForward = () => {
        if (currentPage?.next) setCurrentPage(currentPage.next);
    };

    return (
        <div className="card">
            <h2>Historial de Navegacion (Doubly Linked List)</h2>
            <p><strong>URL Actual:</strong> {currentPage?.url}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleBack} disabled={!currentPage?.prev}>
                    Atrás
                </button>
                <button onClick={handleForward} disabled={!currentPage?.next}>
                    Siguiente
                </button>
            </div>
        </div>
    );
}