import SongPlayer from "./components/SongPlayer";
import BrowserHistory from "./components/BrowserHistory";

export default function App() {

  return (
    <>
    <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Reproductor de musica</h1>
      <SongPlayer />
    </div>
        <div style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Historial de Navegacion</h1>
        <BrowserHistory/>
    </div>
    </>
  );
}
