import { useEffect } from "react"
import { useLists } from "./useLists"


export const useRankColumns = (teams, probs) => {

  const calculatePoints = (lastResults) => {
    const total = lastResults.reduce((acc, race) => acc + race.position, 0)
    const median = Math.round(total / lastResults.length)
    return {median, total}
  }

  const teamsWithPoints = teams.map((team) => {
    const { median, total } = calculatePoints(team.lastResults)
    return {
      ...team,
      stats_pos: median,
      total_points: total
    }
  })

  useEffect(()=>{
    const addProbs = () => {
      teamsWithPoints.map((team) => {
        team["stats_pos"] = probs[team.country]
      })
    }
    addProbs()
  },[probs, teamsWithPoints])

  const sortedTeams = teamsWithPoints.sort((a,b)=>a.total_points -b.total_points)

  const columns = useLists(sortedTeams, teams)

  return columns

}