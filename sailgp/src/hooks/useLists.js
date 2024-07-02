import { useEffect, useState } from "react";


export const useLists = (sortedTeams, teams) => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const createLists = () => {
      const finalPoints = ['Puntos'];
      const newRaces = new Set();
      const newRacesResults = {};
      const newExpectedPos = ['Posición Esperada'];
      const newProbs = ['Probabilidad de Victoria'];
      const newRankedTeams = ['Equipos'] 
      const newColumns = []
      let totalProb = 0;

      sortedTeams.forEach((team) => {
        finalPoints.push(team.total_points);
        team.lastResults.forEach((race) => {
          newRaces.add(race.race);
          if (!newRacesResults[race.race]) {
            newRacesResults[race.race] = [race.race];
          }
          newRacesResults[race.race].push(race.position);
        });
        newRankedTeams.push(team.country);
        newExpectedPos.push(team.stats_pos);
        newProbs.push(team.probabilities);
        totalProb += team.probabilities;
      });

      const newPercent = newProbs.map((prob) => {
        if (!isNaN(prob)) {
          return `${Number(((prob / totalProb) * 100).toFixed(1))} %`
        } else {
          return 'Probabilidad de Victoria'
        }
      });
      const entries = Object.entries(newRacesResults);
      
      newColumns.push(newRankedTeams);
      newColumns.push(finalPoints);
      if (entries.length > 0){
        newColumns.push(entries[0][1]);
        newColumns.push(entries[1][1]);
        newColumns.push(entries[2][1]);
        newColumns.push(entries[3][1]);
      }
      newColumns.push(newExpectedPos);
      newColumns.push(newPercent);
      setColumns(newColumns)
    };

    createLists();
  }, [teams]);

  return columns
}