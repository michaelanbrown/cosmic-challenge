import React, {Suspense, useState, useEffect} from 'react'
import ScientistCard from './ScientistCard'
import ScientistForm from './ScientistForm'
import GridLoader from 'react-spinners/GridLoader'
import PlanetCard from './PlanetCard'
import PlutoSpecialist from './PlutoSpecialist'

function Dashboard() {

  const [scientists, setScientists] = useState([])
  const [planets, setPlanets] = useState([])
  const [missions, setMissions] = useState([])
  const [planetSearch, setPlanetSearch] = useState("")
  const [plutoSpecialist, setPlutoSpecialist] = useState([])
  const [missionShow, setMissionShow] = useState(false)
  const [longMissions, setLongMissions] = useState([])
  const [missionSearch, setMissionSearch] = useState("")
  const [missionErrors, setMissionErrors] = useState([])
  const [planetErrors, setPlanetErrors] = useState([])
  const [scientistSearch, setScientistSearch] = useState([])
  const [scientistErrors, setScientistErrors] = useState([])

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

  function handleScientistSearchChange(e) {
    setScientistSearch(e.target.value)
  }

  function planetSubmit(e) {
    e.preventDefault();
    setPlanetErrors([])
    fetch(`/planet_search/${planetSearch}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }})
    .then(res => {
      if (res.ok) {
        res.json().then(setPlanets)
      } else {
        res.json().then(json => setPlanetErrors(json.errors))
      }
    })
  }

  const sciCards = scientists?.map(sci => <ScientistCard key={sci.id} scientist={sci} onDelete={handleDeleteScientist}/>)

  const planetCards = planets.map(planet => <PlanetCard key={planet.id} planet={planet} image={planet.image}/>)

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

  function missionSubmit(e) {
    e.preventDefault();
    setMissionErrors([])
    fetch(`/mission_search/${missionSearch}`)
    .then(res => {
      if (res.ok) {
        res.json().then(setMissions)
      } else {
        res.json().then(json => setMissionErrors(json.errors))
      }
    })
  }

  function scientistSubmit(e) {
    e.preventDefault();
    fetch(`/scientist_search/${scientistSearch}`)
    .then(res => {
      if (res.ok) {
        res.json().then(setScientists)
      } else {
        res.json().then(json => setScientistErrors(json.errors))
      }
    })
  }


  const longMissionCards = longMissions?.map(mission => <li key={mission.id}>{mission.name} - {mission.length_in_days} Days</li>)

  function handleMissionSearchChange(e) {
    setMissionSearch(e.target.value)
  }

  const missionLis = missions.map(mission => <li key={mission.id}>{mission.name}</li>)

  return (
  <>
      <Suspense fallback={<GridLoader />}>
        <h1>Scientists</h1>
        <form onSubmit={scientistSubmit}>
          <input
          type="text"
          name="field_of_study"
          value={scientistSearch}
          placeholder="Search for a scientist by field"
          onChange={handleScientistSearchChange}/>{' '}
          <button>Submit!</button>
        </form>
        {scientistErrors ? scientistErrors.map(error => <p className="error" key={error}>{error}</p>) : null}
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
      <form onSubmit={planetSubmit}>
      <input
                    type="text"
                    name="name"
                    placeholder="Search for a Planet"
                    value={planetSearch}
                    onChange={handlePlanetSearchChange}
      />{' '}
      <button>Search!</button>
      </form>
      {planetErrors ? planetErrors.map(error => <p className="error" key={error}>{error}</p>) : null}
      { planetCards }
      <hr/>
      <h1>Missions</h1>
      <h4>Filter by length in Days!</h4>
      <form onSubmit={missionSubmit}>
      <input
                    type="text"
                    name="length_in_days"
                    placeholder="Search for a Mission by length in days!"
                    value={missionSearch}
                    onChange={handleMissionSearchChange}
      />{' '}
      <button>Search!</button>
      </form>
      <br/>
      { missionLis }
      {missionErrors ? missionErrors.map(error => <p className="error" key={error}>{error}</p>) : null}
      <hr/>
      <h2>Long Missions</h2>
      <button onClick={longMissionClick}>Long Missions</button>
      {longMissions ? longMissionCards : null}
    </>
  )
}

export default Dashboard
