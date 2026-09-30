import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121418', color: '#E0E0E0' }}>
      {/* Componente del menú lateral N-ario */}
      <Sidebar />

      {/* Área de contenido principal simulada */}
      <main style={{ flex: 1, padding: '3rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ borderBottom: '1px solid #336699', paddingBottom: '1rem', color: '#FFFFFF' }}>
          Panel de Control
        </h1>
        <p style={{ marginTop: '1rem', color: '#A0A0A0' }}>
          El menú lateral izquierdo se genera dinámicamente a partir de un árbol N-ario.
        </p>
        <p style={{ marginTop: '0.5rem', color: '#A0A0A0' }}>
          Actualmente simulando la ruta: <strong>/settings/security</strong>
        </p>
      </main>
    </div>
  );
}

export default App;