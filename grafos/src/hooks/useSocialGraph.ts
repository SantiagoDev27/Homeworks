import { useMemo, useState } from 'react'
import { createSeedGraph } from '../models/SocialGraph'
import { toGraphData } from '../utils/graphData'

export function useSocialGraph() {
  const [sg] = useState(createSeedGraph)
  const [version, setVersion] = useState(0)

  /* eslint-disable react-hooks/exhaustive-deps */
  const data = useMemo(() => toGraphData(sg), [sg, version])
  const cities = useMemo(() => [...sg.cities.keys()], [sg, version])
  const people = useMemo(() => [...sg.people.keys()], [sg, version])
  /* eslint-enable react-hooks/exhaustive-deps */

  const refresh = (ok: boolean) => {
    if (ok) setVersion((v) => v + 1)
    return ok
  }

  return {
    data,
    cities,
    people,
    addCity: (name: string) => refresh(sg.addCity(name)),
    addPerson: (name: string, age: number, city: string) => refresh(sg.addPerson(name, age, city)),
    addFriendship: (a: string, b: string) => refresh(sg.addFriendship(a, b)),
    getPeopleByCity: (city: string) => sg.getPeopleByCity(city),
  }
}

