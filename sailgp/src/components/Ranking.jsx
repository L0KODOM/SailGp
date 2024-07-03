import { useContext } from "react"
import { TeamsContext } from "../context/TeamsContext"
import '../styles/ranking.css'
import { useRankColumns } from "../hooks/useRankColumns"
import { NavLink } from "react-router-dom"


export const Ranking = () => {
  
  const teams = useContext(TeamsContext)

  const columns = useRankColumns(teams)

  const regattas = columns[3]

  const headers = []

  columns.forEach((column)=>{
    if (column !== regattas){
      headers.push(column[0])
    }
    else{
      column.forEach((regata)=>{
        headers.push(regata[0])
      })
    }
  })

  if (!teams ){
    return(
      <p>loading...</p>
    )
  }

  return(
    <section className="ranking-section">
      <h1>Season 4</h1>
      <div className="ranking">
        <ol>
          {columns.map((column, index) => (
            <li key={index}>
              <ul className={column !== regattas? "columnas" : "regatas"}>
                {column.map((value, index)=>(
                  <li key={index} className="inside">
                    {value.length > 30?
                      <div className="value" style={headers.includes(value)? {width: 70, height:72.5, position: "relative", bottom: "10px", paddingBottom: "21px"} : {width: 70, height:72.5}}>
                        <img src={value} alt="flag"/>
                      </div>
                    : columns[1].includes(value) && value !== 'Equipos'?
                      <p className="value"><NavLink to={`/team/${value}`}>{value}</NavLink></p>
                    : headers.includes(value)? 
                      <p className="value" style={{color:"yellow", position: "relative", bottom: "10px",borderBottom: "6px solid rgb(4, 49, 34)", paddingBottom: "15px"}}>{value}</p>
                    : regattas.includes(value)?
                      <ul id="regatas">
                        {value.map((race, index)=>(
                          <li key={index}>
                            {headers.includes(race)?
                            <p className="value" style={{position: "relative", bottom: "10px", paddingBottom: "21px"}}>{race}</p>
                            :<p className="value">{race}</p>
                            }
                          </li>
                        ))}
                      </ul>
                    : <p className="value">{value}</p>
                    }
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}