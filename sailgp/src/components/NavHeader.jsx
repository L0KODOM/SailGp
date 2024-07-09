import { NavLink } from "react-router-dom"
import '../styles/navheader.css'
import { useContext, useState } from "react"
import { TeamsContext } from "../context/TeamsContext"


export const NavHeader = () => {

  const {teams} = useContext(TeamsContext)

  const [teamsExpanded, setTeamsExpanded] = useState(false)

  const handleTeams = () => {
    setTeamsExpanded(!teamsExpanded)
  }

  
  if (!teams){
    return(
      <p>loading...</p>
    )
  }


  return(
    <div className="navheader">
      <NavLink to={"/"}>
        <img src="https://images.ctfassets.net/2lppn7hwgzta/58zlbktS7RiHV9j36zMXw3/2dd1cb7f97607f28abfcc9941abeb26a/SailGP_Logo_White__1_PADDING.png" alt="logo"/>
      </NavLink>
      <div>
        <div className="teams-list">
          <h2 onClick={handleTeams}>TEAMS</h2>
          {teamsExpanded?
            teams.map((team) => (
              <NavLink 
                key={team.country}
                to={`team/${team.country}`}
                onClick={handleTeams}
              >
                {team.country}
              </NavLink>
            ))
          : null}
        </div>
        <div>
          <NavLink to={"/ranking"}>
            <h2 style={{color: "rgb(255, 255, 255)"}}>RANKING</h2>
          </NavLink>
        </div>
      </div>
    </div>
  )
}