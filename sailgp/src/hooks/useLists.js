import { useEffect, useState } from "react";


export const useLists = (sortedTeams, teams) => {
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const createLists = () => {
      const finalPoints = ['Puntos'];
      const newRaces = new Set();
      const newRacesResults = {};
      const regattas = []
      const newExpectedPos = ['Posición Esperada'];
      const newProbs = ['Probabilidad de Victoria'];
      const newRankedTeams = ['Equipos'] ;
      const flags = ['https://images.ctfassets.net/2lppn7hwgzta/58zlbktS7RiHV9j36zMXw3/2dd1cb7f97607f28abfcc9941abeb26a/SailGP_Logo_White__1_PADDING.png']
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
        const teamProbs = Object.entries(team.stats_pos)
        newExpectedPos.push(teamProbs);
        newProbs.push(team.probabilities);
        flags.push(team.flag)
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
      
      newColumns.push(flags)
      newColumns.push(newRankedTeams);
      newColumns.push(finalPoints);
      
      if (entries.length > 0){
        entries.forEach((entry)=>{
          regattas.push(entry[1])
        })
      }
      newColumns.push(regattas);
      const probEntries = Object.entries(newExpectedPos)
      newColumns.push(probEntries);
      newColumns.push(newPercent);
      setColumns(newColumns)
    };

    createLists();
  }, [teams]);

  return columns
}