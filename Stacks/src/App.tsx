import { useBookStack } from './hooks/useBookStack';
import { BookForm } from './components/BookForm';
import { BookStackDisplay } from './components/BookStackDisplay';
import './App.css';

function App() {
  const { pushBook, popBook, getReversedStack, isEmpty } = useBookStack();

  return (
    <div className="app-layout">
      <header>
        <h1>Gestor de Pila de Libros</h1>
      </header>
      <main className="main-content">
        <aside className="left-panel">
          <BookForm onAddBook={pushBook} />
        </aside>
        <section className="right-panel">
          <BookStackDisplay 
            books={getReversedStack()} 
            onPop={popBook} 
            isEmpty={isEmpty} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;