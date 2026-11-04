import './App.css'
import CityPeople from './components/CityPeople/CityPeople'
import GraphForm from './components/GraphForm/GraphForm'
import GraphInit from './components/GraphView/GraphView'
import { useSocialGraph } from './hooks/useSocialGraph'

function App() {
  const { data, cities, people, addCity, addPerson, addFriendship, getPeopleByCity } = useSocialGraph()

  return (
    <>
      <section id="title">
        <h1 className="title">Ciudades y amigos con react-d3-graph</h1>
      </section>
      <section id="information">
        <GraphForm
          cities={cities}
          people={people}
          onAddCity={addCity}
          onAddPerson={addPerson}
          onAddFriendship={addFriendship}
        />
        <CityPeople cities={cities} getPeopleByCity={getPeopleByCity} />
      </section>
      <section id="graph">
        <GraphInit data={data} />
      </section>
    </>
  )
}

export default App
