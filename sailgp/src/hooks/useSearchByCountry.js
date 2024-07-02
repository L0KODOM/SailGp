
import { searchTeamsByCountry } from "../services/teams"
import { useEffect, useState } from "react"

export const useSearchByCountry = (country) => {
  const [selectedTeam, setSelectedTeam] = useState(null)
  useEffect(()=>{
    const search = async() => {
      const team =  await searchTeamsByCountry(country)
      setSelectedTeam(team)
    }

    search()
    
  },[country, setSelectedTeam])

  return selectedTeam
}