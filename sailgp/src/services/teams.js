import { API_KEY } from "../util/constants"



const URL = 'http://127.0.0.1:8000/teams/'

export const searchTeams = async () => {
  
  try {
    const response = await fetch(`http://127.0.0.1:8000/teams/api_key=${API_KEY}`)
    const json = await response.json()

    const teams = json.map( team => ({
      country: team.country,
      nickname: team.nickname,
      lastResults: team.last_results,
      probabilities: team.probabilities,
      flag: team.flag
    }))

    return teams

  } catch (e) {
    throw new Error('Error searching teams')
  }
}

export const searchTeamsByCountry = async ( search ) => {
  
  try {
    const response = await fetch(`${URL}${search}`)
    const json = await response.json()

    return json

  } catch (e) {
    throw new Error('Error searching teams')
  }

}

export const searchProbs = async () => {

  try {
    const response = await fetch(`${URL}probs`)
    const json = await response.json()

    return json

  } catch (e) {
    throw new Error(`error searching probs ${e}`)
  }
}