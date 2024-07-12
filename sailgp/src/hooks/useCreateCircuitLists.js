import { useState, useEffect } from 'react';

export const useCreateCircuitLists = (circuitResults) => {
  const [resultsList, setResultsList] = useState([]);

  useEffect(() => {
    if (!circuitResults) return; 

    const sortedTeams = circuitResults.sort((a, b) => a.position - b.position);

    const teams = ['Equipos'];
    const points = ['Puntos'];
    const positions = ['Posición'];

    sortedTeams.forEach((result) => {
      teams.push(result.team);
      points.push(result.points);
      positions.push(result.position);
    });

    const newResultsList = [teams, positions, points];
    setResultsList(newResultsList);
  }, [circuitResults]);

  return resultsList;
};