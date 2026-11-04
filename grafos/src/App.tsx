import { useState } from 'react'
import './App.css'
import CityPeople from './components/CityPeople/CityPeople'
import GraphForm from './components/GraphForm/GraphForm'
import GraphInit from './components/GraphView/GraphView'
import Legend from './components/Legend/Legend'
import { useSocialGraph } from './hooks/useSocialGraph'

function App() {
  const { data, cities, people, addCity, addPerson, addFriendship, getPeopleByCity } = useSocialGraph()
  const [selectedCity, setSelectedCity] = useState('') // '' = ver todos (predeterminado)

  return (
    <section className='mainContainer'>
      <section>
        <div id="title">
          <h1 className="title">Ciudades y amigos con react-d3-graph</h1>
        </div>
        <section id="information">
          <GraphForm
            cities={cities}
            people={people}
            onAddCity={addCity}
            onAddPerson={addPerson}
            onAddFriendship={addFriendship}
          />
          <CityPeople
            cities={cities}
            getPeopleByCity={getPeopleByCity}
            selected={selectedCity}
            onSelect={setSelectedCity}
          />
          <Legend />
        </section>
      </section>
      <section id="graph">
        <div className="grapContainer">
          <GraphInit data={data} city={selectedCity} />
        </div>
      </section>
    </section >
  )
}

export default App
