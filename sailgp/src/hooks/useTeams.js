import { useEffect, useState } from "react";
import { searchProbs, searchTeams } from "../services/teams"

export const useTeams = () => {
  const [teams, setTeams] = useState([]);
  const [probs, setProbs] = useState([]);

  const fetchTeams = async () => {
    const teamsData = await searchTeams();
    const probsData = await searchProbs();
    setTeams(teamsData);
    setProbs(probsData);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return {teams, probs}
}