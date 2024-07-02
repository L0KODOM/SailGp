import { useLists } from "./useLists"


export const useRankColumns = (teams) => {

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

  const sortedTeams = teamsWithPoints.sort((a,b)=>a.total_points -b.total_points)

  const columns = useLists(sortedTeams, teams)

  return columns

}