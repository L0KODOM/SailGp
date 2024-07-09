/* eslint-disable react/prop-types */

import { useBuildCrew } from "../hooks/buildCrew"



export const Crew = ( {crew} ) => {

  const builtCrew = useBuildCrew(crew)

  return(
    <div className="team-div">
      <ul>
        {builtCrew.map((sailor, index)=>(
          <li key={index} className="card">
            <p>{sailor[1].name}</p>
            <p>{sailor[1].age} años</p>
            <p>{sailor[1].position}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}