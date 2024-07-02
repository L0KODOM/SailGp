

const API_KEY = '5ecdf18e-c543-4fa3-aff7-dbade6f04407'

export const searchTeams = async () => {
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/teams/api_key=${API_KEY}`)
    const json = await response.json()

    const teams = json.map( team => ({
      country: team.country,
      nickname: team.nickname,
      lastResults: team.last_results,
      probabilities: team.probabilities
    }))

    return teams

  } catch (e) {
    throw new Error('Error searching teams')
  }
}

export const searchTeamsByCountry = async ( search ) => {
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/teams/${search}`)
    const json = await response.json()

    return json

  } catch (e) {
    throw new Error('Error searching teams')
  }

}