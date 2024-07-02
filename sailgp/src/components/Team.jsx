import '../styles/teams.css'
import { useParams } from "react-router-dom"
import { Crew } from "./crew"
import { LastResults } from "./lastResults"
import { SeasonsResults } from "./seasonsResults"
import { useSearchByCountry } from "../hooks/useSearchByCountry"
import { useState } from "react"



export const Team = (  ) => {
  const { country } = useParams()
  const selectedTeam = useSearchByCountry(country)
  const [activeSection, setActiveSection] = useState('')

  const activateSection = (section) => {
    setActiveSection((prevSection)=> (prevSection === section ? '' : section))
  }

  if (!selectedTeam) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>{country}</h1>
      <h2>{selectedTeam.nickname}</h2>
      <button onClick={()=>{activateSection('crew')}}>Crew</button>
      <button onClick={()=>{activateSection('last_results')}}>Last Results</button>
      <button onClick={()=>{activateSection('season_results')}}>Season Results</button>
      {activeSection === 'crew' ?
        <Crew crew={selectedTeam.crew}/>
        : activeSection === 'last_results' ?
        <LastResults results={selectedTeam.last_results}/>
        : activeSection === 'season_results' ?
        <SeasonsResults results={selectedTeam.seasons_results}/>
        : null
      }
      
    </section>
  );
}