import { useContext, useState } from "react"
import { TeamsContext } from "../context/TeamsContext"
import '../styles/ranking.css'
import { useRankColumns } from "../hooks/useRankColumns"
import { NavLink } from "react-router-dom"
import { styles, countries } from "../util/constants"
import { getHeaders } from "../hooks/getHeaders"


export const Ranking = () => {
  
  const {teams, probs} = useContext(TeamsContext)

  const columns = useRankColumns(teams, probs)

  const handleProbs = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    
  }

  const [showProbs, setShowProbs] = useState(handleProbs)

  
  const handleShowProbs = (number) => {
    
      const newState = {...showProbs}

      for (let i = 1; i<=7; i++){
        if (i !== number){
          newState[i] = false
        }
        else{
          newState[number] = !showProbs[number]
        }
      }

      setShowProbs(newState)
  };

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
          .prob-column ul::-webkit-scrollbar-track {
            background: ${styles[pageStyle].bg};
          }
          .prob-column ul::-webkit-scrollbar {
            width: 2px
          }
          .prob-column ul::-webkit-scrollbar-thumb {
            background: ${styles[pageStyle].thumb}; 
            border-radius: 6px; 
          }
          .prob-column ul::-webkit-scrollbar-thumb:hover {
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

          .prob-column *{
            background-color: ${styles[pageStyle].bg};
            border-radius: 10px;
          }
        `}
      </style>
      <h1>Season 4</h1>
      <div className="ranking" style={{backgroundColor: styles[pageStyle].bg, boxShadow: styles[pageStyle].shadow}}>
        <ol style={{backgroundColor: styles[pageStyle].bg}}>
          {columns.map((column, index) => (
            index !== 4?
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
            : <li key={index} style={{backgroundColor: styles[pageStyle].li}}>
                <ul className="columnas" >
                  {column.map((value, index)=>(
                    index===0?
                    <li key={index} className="inside" style={{backgroundColor: styles[pageStyle].li}}>
                      <p className="value" style={{color:"yellow", position: "relative", bottom: "10px",borderBottom: `6px solid ${styles[pageStyle].bg}`, paddingBottom: "15px"}}>{value[1]}</p>
                    </li>
                    : <li key={index} className="inside" onClick={()=>{handleShowProbs(index)}} style={{cursor:"pointer", backgroundColor: styles[pageStyle].li}}>
                        {showProbs[index]?
                        <div>
                          <p className="value" id="cuotas">X</p>
                          <div  className="prob-column">
                            <ul>
                              <i className="material-icons" style={{position: "absolute", top:"170px", right: "78px", color: "yellow"}}>arrow_drop_down</i>
                              {value[1].map((prob,index)=>(
                                <li key={index} style={{backgroundColor: styles[pageStyle].bg}}>
                                  <p>{prob[0]}º  {(prob[1]*100).toFixed(2)}%</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        : <p className="value" id="cuotas">Cuotas</p>} 
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