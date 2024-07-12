import '../styles/teams.css'
import { useParams } from "react-router-dom"
import { Crew } from "./crew"
import { LastResults } from "./lastResults"
import { SeasonsResults } from "./seasonsResults"
import { useSearchByCountry } from "../hooks/useSearchByCountry"
import { useState } from "react"
import { styles } from '../util/constants'
import { useCountryVerification } from '../hooks/verificateCountry'

export const Team = (  ) => {
  const { country } = useParams()
  const selectedTeam = useSearchByCountry(country)
  const [activeSection, setActiveSection] = useState('')
  

  const activateSection = (section) => {
    setActiveSection((prevSection)=> (prevSection === section ? '' : section))
  }

  const verificatedCountry = useCountryVerification(country)

  if (!selectedTeam) {
    return <p>Loading...</p>;
  }

  return (
    <section className='team-section'>
      <div className='section-block'>
        <h1>{country}</h1>
        <div className='nickname'>
          <img alt='logo' src= {styles[verificatedCountry].logo}/>
        </div>
        <div className='display-options'>
          <button onClick={()=>{activateSection('crew')}}>Crew</button>
          <button onClick={()=>{activateSection('last_results')}}>Last Results</button>
          <button onClick={()=>{activateSection('season_results')}}>Season Results</button>
        </div>
      </div>
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