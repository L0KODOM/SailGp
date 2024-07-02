/* eslint-disable react/prop-types */

import { useRaceResultsLists } from "../hooks/useRacesResultsLists"


export const SeasonsResults = ( {results} ) => {

  const columns = useRaceResultsLists(results, 'season')


  return(
    <div className="team-div">
      {columns.map((value, index)=>(
        <ul key={`value ${index}`}>
          {value.map((data, index)=>(
            <li key={`data ${index}`}>
              <p>{data}</p>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}