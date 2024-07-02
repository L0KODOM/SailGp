import { useEffect, useState } from "react";
import { searchTeams } from "../services/teams"

export const useTeams = () => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    const teamsData = await searchTeams();
    setTeams(teamsData);
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return teams
}