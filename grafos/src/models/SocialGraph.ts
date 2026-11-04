import { Graph } from './Graph'
import type { City, Person } from '../types/graph'

export const cityId = (name: string) => `city:${name}`
export const personId = (name: string) => `person:${name}`

/** Dominio de ciudades y amigos, construido sobre la clase Graph. */
export class SocialGraph {
  readonly graph = new Graph()
  readonly cities = new Map<string, City>()
  readonly people = new Map<string, Person>()

  addCity(name: string): boolean {
    const clean = name.trim()
    if (!clean || this.cities.has(clean)) return false
    this.cities.set(clean, { name: clean })
    this.graph.addNode(cityId(clean))
    return true
  }

  addPerson(name: string, age: number, city: string): boolean {
    const clean = name.trim()
    if (!clean || !Number.isFinite(age) || age <= 0) return false
    if (this.people.has(clean) || !this.cities.has(city)) return false
    this.people.set(clean, { name: clean, age, city })
    this.graph.addNode(personId(clean))
    this.graph.addEdge(personId(clean), cityId(city))
    return true
  }

  addFriendship(a: string, b: string): boolean {
    if (a === b || !this.people.has(a) || !this.people.has(b)) return false
    if (this.graph.adjList[personId(a)].includes(personId(b))) return false
    this.graph.addEdge(personId(a), personId(b))
    return true
  }

  getPeopleByCity(city: string): Person[] {
    return [...this.people.values()].filter((p) => p.city === city)
  }
}

export function createSeedGraph(): SocialGraph {
  const sg = new SocialGraph()
  ;['Lima', 'Bogotá', 'Quito'].forEach((c) => sg.addCity(c))

  sg.addPerson('Ana', 25, 'Lima')
  sg.addPerson('Luis', 30, 'Lima')
  sg.addPerson('Carla', 22, 'Bogotá')
  sg.addPerson('Sofía', 27, 'Bogotá')
  sg.addPerson('Pedro', 28, 'Quito')

  sg.addFriendship('Ana', 'Luis')
  sg.addFriendship('Ana', 'Carla')
  sg.addFriendship('Luis', 'Pedro')
  sg.addFriendship('Carla', 'Sofía')
  return sg
}

