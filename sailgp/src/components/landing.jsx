import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { TeamsContext } from "../context/TeamsContext";
import '../styles/landing.css'



export const Landing = () => {
  
  const teams = useContext(TeamsContext)

  if (!teams){
    return(
      <p>loading...</p>
    )
  }

  return (
    <section className="landing">
      <NavLink to={"/ranking"}>
        Clasificación
      </NavLink>
      <div>
        {teams.map((team) => (
          <NavLink 
            key={team.country}
            to={`team/${team.country}`}
          >
            {team.country}
          </NavLink>
        ))}
      </div>
    </section>
  );
};