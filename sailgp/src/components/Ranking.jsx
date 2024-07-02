import { useContext } from "react"
import { TeamsContext } from "../context/TeamsContext"
import '../styles/ranking.css'
import { useRankColumns } from "../hooks/useRankColumns"
import { NavLink } from "react-router-dom"


export const Ranking = () => {
  
  const teams = useContext(TeamsContext)

  const columns = useRankColumns(teams)

  const headers = ['Equipos', 'Puntos', 'Posición Esperada', 'Probabilidad de Victoria']

  if (!teams ){
    return(
      <p>loading...</p>
    )
  }

  return(
    <section className="ranking">
      <ol>
        {columns.map((column, index) => (
          <li key={index}>
            <ul>
              {column.map((value, index)=>(
                <li key={index}>
                  {columns[0].includes(value) && value !== 'Equipos'?
                    <p><NavLink to={`/team/${value}`}>{value}</NavLink></p>
                  : headers.includes(value)?
                      <p>{value}</p>
                    : <p>{value}</p>
                  }
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}