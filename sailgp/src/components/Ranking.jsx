import { useContext, useState } from "react"
import { TeamsContext } from "../context/TeamsContext"
import '../styles/ranking.css'
import { useRankColumns } from "../hooks/useRankColumns"
import { NavLink } from "react-router-dom"
import { styles, countries } from "../util/constants"
import { getHeaders } from "../hooks/getHeaders"


export const Ranking = () => {
  
  const teams = useContext(TeamsContext)

  const columns = useRankColumns(teams)

  const {headers, regattas} = getHeaders(columns)
 
  const [pageStyle, setPageStyle] = useState('Australia')

  const handleChange = (flag) => {

    countries.forEach((team)=>{
      if (flag.includes(team)){
        setPageStyle(team)
      }
    })
  }


  if (!teams ){
    return(
      <p>loading...</p>
    )
  }

  return(
    <section className="ranking-section">
      <style>
        {`
          .regatas::-webkit-scrollbar-track {
            background: ${styles[pageStyle].bg};
          }
          .regatas::-webkit-scrollbar {
            height: 12px; 
          }
          .regatas::-webkit-scrollbar-thumb {
            background: ${styles[pageStyle].thumb}; 
            border-radius: 6px; 
          }
          .regatas::-webkit-scrollbar-thumb:hover {
            background: #555; 
          }
          .ranking-section h1{
            text-shadow: ${styles[pageStyle].textShadow}
          }
          .main{
            background: 
              linear-gradient(rgba(1, 26, 2, 0.5), rgba(13, 34, 16, 0.5)),
              url(${pageStyle? styles[pageStyle].picture : "https://www.livingpuramadera.com/wp-content/uploads/2021/10/sailgp2.jpg"});
          }
        `}
      </style>
      <h1>Season 4</h1>
      <div className="ranking" style={{backgroundColor: styles[pageStyle].bg, boxShadow: styles[pageStyle].shadow}}>
        <ol style={{backgroundColor: styles[pageStyle].bg}}>
          {columns.map((column, index) => (
            <li key={index} style={{backgroundColor: styles[pageStyle].li}}>
              <ul className={column !== regattas? "columnas" : "regatas"}>
                {column.map((value, index)=>(
                  <li key={index} className="inside" style={{backgroundColor: styles[pageStyle].li}}>
                    {value.length > 30?
                      <div className="value" style={headers.includes(value)? {width: 70, height:72.5, position: "relative", bottom: "10px", paddingBottom: "21px"} : {width: 70, height:72.5}}>
                        <img src={value} alt="flag" onClick={()=>{handleChange(value)}}/>
                      </div>
                    : columns[1].includes(value) && value !== 'Equipos'?
                      <p className="value"><NavLink to={`/team/${value}`}>{value}</NavLink></p>
                    : headers.includes(value)? 
                      <p className="value" style={{color:"yellow", position: "relative", bottom: "10px",borderBottom: `6px solid ${styles[pageStyle].bg}`, paddingBottom: "15px"}}>{value}</p>
                    : regattas.includes(value)?
                      <ul id="regatas" style={{backgroundColor: styles[pageStyle].light}}>
                        {value.map((race, index)=>(
                          <li key={index} style={{backgroundColor: styles[pageStyle].li}}>
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