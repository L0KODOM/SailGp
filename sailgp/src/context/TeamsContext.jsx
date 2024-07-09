import { createContext } from "react";
import { useTeams } from "../hooks/useTeams";


export const TeamsContext = createContext()

// eslint-disable-next-line react/prop-types
export const TeamsProvider = ( { children } ) => {

  const {teams, probs} = useTeams()

  return(
    <TeamsContext.Provider value={{teams, probs}}>
      {children}
    </TeamsContext.Provider>
  )
}