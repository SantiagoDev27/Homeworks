import './App.css'
import ServicesList from './ui/servicesList'

function App() {
  return (
    <>
      <section>
        <div>
          <h1> SISTEMA CLINICO</h1>
          <p> Desde aqui podras gestionar los turnos de los pacientes, historial de atención y rotación de médicos de guardia</p>
        </div>
        <div>
          <ServicesList />
        </div>
      </section>
    </>
  )
}

export default App
