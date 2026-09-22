import { useAtmQueue } from './hooks/useAtmQueue';
import { PersonForm } from './components/PersonForm';
import { AtmQueueDisplay } from './components/AtmQueueDisplay';
import './App.css';

function App() {
  const { queue, enqueue, dequeue, isEmpty } = useAtmQueue();

  return (
    <div className="app-layout">
      <header>
        <h1>Simulador de Cola ATM</h1>
      </header>
      <main className="main-content">
        <aside className="left-panel">
          <PersonForm onEnqueue={enqueue} />
        </aside>
        <section className="right-panel">
          <AtmQueueDisplay 
            queue={queue} 
            onDequeue={dequeue} 
            isEmpty={isEmpty} 
          />
        </section>
      </main>
    </div>
  );
}

export default App;