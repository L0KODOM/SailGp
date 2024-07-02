/* eslint-disable react/prop-types */
import { useRaceResultsLists } from "../hooks/useRacesResultsLists"


export const LastResults = ( {results} ) => {

  const columns = useRaceResultsLists(results, 'race')

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