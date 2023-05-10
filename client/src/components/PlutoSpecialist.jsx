import React from 'react'
import { Link } from 'react-router-dom'
import { SuspenseImg } from './SuspenseImage'

function PlutoSpecialist({scientist: {id, name, avatar, missions}, missionShow}) {

  const missionRender = missionShow ? missions.map(mission => <li key={mission.id}>{mission.name}</li>) : null

  return (
    <div className="scicard">
        <SuspenseImg src={avatar} alt={name} />
        <h3>{name}</h3>
        {missionRender}
    </div>
  )
}

export default PlutoSpecialist