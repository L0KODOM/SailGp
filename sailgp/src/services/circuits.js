import { API_KEY } from "../util/constants"

const URL = 'http://127.0.0.1:8000/circuits/'


export const searchCircuitByName = async ( name ) => {

  try{
    const response = await fetch(`${URL}${name}`)
    const json = await response.json()

    return json
  }catch (e){
    throw new Error('Error searching circuit')
  }

}

export const searchAllCircuits = async () => {

  try{
    const response = await fetch(`${URL}api_key=${API_KEY}`)
    const json = await response.json()

    const transformDate = (date) => {
      const parts = date.split("/");
      const newText = `${parts[0]}      ${parts[1]}      ${parts[2]}`
      return newText
    }

    const circuits = json.map( (circuit) => ({
      id: circuit.id,
      name: circuit.name,
      picture: circuit.picture,
      date: transformDate(circuit.date),
      conditions: circuit.conditions,
      results: circuit.results

    }))

    return circuits
  }catch (e){
    throw new Error(`Error searching circuits: ${e}`)
  }

}