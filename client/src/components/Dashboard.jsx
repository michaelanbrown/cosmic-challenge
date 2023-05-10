import React, {Suspense, useState, useEffect} from 'react'
import ScientistCard from './ScientistCard'
import ScientistForm from './ScientistForm'
import GridLoader from 'react-spinners/GridLoader'
import PlanetCard from './PlanetCard'
import PlutoSpecialist from './PlutoSpecialist'
import { redirect } from 'react-router-dom'

function Dashboard() {

  const [scientists, setScientists] = useState([])
  const [planets, setPlanets] = useState([])
  const [missions, setMissions] = useState([])
  const [planetSearch, setPlanetSearch] = useState("")
  const [plutoSpecialist, setPlutoSpecialist] = useState([])
  const [missionShow, setMissionShow] = useState(false)
  const [longMissions, setLongMissions] = useState([])
  const [missionSearch, setMissionSearch] = useState("")

  useEffect(() => {
    const fetchScientists = async () => {
      const response = await fetch('/scientists')
      const sciArr = await response.json()
      setScientists(sciArr)
    }
    const fetchPlanets = async () => {
      const response = await fetch('/planets')
      const planetArr = await response.json()
      setPlanets(planetArr)
    }
    const fetchMissions = async () => {
      const response = await fetch('/missions')
      const missionArr = await response.json()
      setMissions(missionArr)
    }
    fetchScientists();
    fetchPlanets();
    fetchMissions()
      .catch(console.error)
    
  }, [])

  function handleAddScientist(newSci){
    setScientists(scientists => [...scientists, newSci])
  }

  function handleDeleteScientist(id){
    fetch(`/scientists/${id}`, {method: "DELETE"})
    .then(r => {
      if (r.ok) {
        setScientists(scientists => scientists.filter(sci => sci.id != id))
      }
    })
  }

  function handlePlanetSearchChange(e) {
    setPlanetSearch(e.target.value)
  }

  const filteredPlanets = [...planets].filter(planet => planet.name.toLowerCase().includes(planetSearch.toLowerCase()))

  const sciCards = scientists?.map(sci => <ScientistCard key={sci.id} scientist={sci} onDelete={handleDeleteScientist}/>)

  const planetCards = filteredPlanets.map(planet => <PlanetCard key={planet.id} planet={planet} image={planet.image}/>)

  function plutoSpecialistClick() {
    fetch('/pluto_specialist')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(scientists => {
          setPlutoSpecialist(scientists)
        })
      }
    })}

  function plutoSpecialistMissionClick() {
    setMissionShow(!missionShow)
  }

  const plutoSpecialistCards = plutoSpecialist?.map(sci => <PlutoSpecialist key={sci.id} scientist={sci} missionShow={missionShow}/>)

  function longMissionClick() {
    fetch('/greater_than_30')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(missions => {
          setLongMissions(missions)
        })
      }
    })
  }

  const longMissionCards = longMissions?.map(mission => <li key={mission.id}>{mission.name} - {mission.length_in_days} Days</li>)

  function handleMissionSearchChange(e) {
    setMissionSearch(e.target.value)
  }

  const missionOptions = ["",...missions.map(miss=> miss.length_in_days)].sort().map(mission => {
    return (<option value={mission} key={mission ? mission : "blank"}>{mission}</option>)
})

const filteredMissions = [...missions].filter(mission => mission.length_in_days == missionSearch)

  const missionLis = missionSearch == "" ? missions.map(mission => <li key={mission.id}>{mission.name}</li>)
  : filteredMissions.map(mission => <li key={mission.id}>{mission.name}</li>)

  return (
  <>
      <Suspense fallback={<GridLoader />}>
        <h1>Scientists</h1>
        <div className="sciList">
          {sciCards}

        </div>
      </Suspense>
      <hr />
      <h1>Filter for Scientist</h1>
      <button onClick={plutoSpecialistClick}>Pluto Specialist</button>{' '}<button onClick={plutoSpecialistMissionClick}>Pluto Specialist Missions</button>
      <div className="sciList">
        {plutoSpecialist ? plutoSpecialistCards : null}
      </div>
      <hr />
      <ScientistForm onScientistRequest={handleAddScientist} edit={false} />
      <hr/>
      <h1>Planets</h1>
      <form>
      <input
                    type="text"
                    id="planetSearch"
                    placeholder="Search for a Planet"
                    value={planetSearch}
                    onChange={handlePlanetSearchChange}
      />
      </form>
      { planetCards }
      <hr/>
      <h1>Missions</h1>
      <h4>Filter by length in Days!</h4>
      <form>
      <select id="missionSearch" onChange={handleMissionSearchChange}>
      { missionOptions }
      </select>
      </form>
      <br/>
      { missionLis }
      <hr/>
      <h2>Long Missions</h2>
      <button onClick={longMissionClick}>Long Missions</button>
      {longMissions ? longMissionCards : null}
    </>
  )
}

export default Dashboard
