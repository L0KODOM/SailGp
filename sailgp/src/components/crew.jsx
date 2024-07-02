/* eslint-disable react/prop-types */

import { useCrewList } from "../hooks/useCrewList"


export const Crew = ( {crew} ) => {

  const crewColumns = useCrewList(crew)

  return(
    <div className="team-div">
      <div className="row">
        {crewColumns.map((value, index)=>(
          <ul key={index} >
            {value.map((data, index)=>(
              <li key={index}>
                <p>{data}</p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}