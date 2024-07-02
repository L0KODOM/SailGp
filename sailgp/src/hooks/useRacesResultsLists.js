import { useEffect, useState } from "react"



export const useRaceResultsLists = (results, type) => {

  const [columns, setColumns] = useState([])

  useEffect(()=>{
    const titles = [' .', 'Posición', 'Puntos']
    const races = {}
    const newColumns = [titles]

    const createLastResultsList = () => {
      results.forEach((race) => { 
        if (type === 'season'){
          if (!races[race.season]){
            races[race.season] = [race.season, race.position, race.points];
          }
        }
        else {
          if (!races[race.race]){
            races[race.race] = [race.race, race.position, race.points];
          }
        }
      });
      const racesLists = Object.entries(races);
      racesLists.forEach((race)=>{
        newColumns.push(race[1]);
      })
      setColumns(newColumns);
    }
    createLastResultsList()
  },[results, type])

  return columns
}