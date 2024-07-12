
import { searchTeamsByCountry } from "../services/teams"
import { useEffect, useState } from "react"

export const useSearchByCountry = (country) => {
  const [selectedTeam, setSelectedTeam] = useState(null)
  useEffect(()=>{
    let isMounted = true;

    const search = async() => {
      const team =  await searchTeamsByCountry(country)
      if (isMounted) {
        setSelectedTeam(team);
      }
    }

    search();

    return () => {
      isMounted = false
    };
    
  },[country])

  return selectedTeam
}
