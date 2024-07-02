import { useEffect, useState } from "react";



export const useCrewList = (crew) => {
  const [crewColumns, setCrewColumns] = useState([])

  useEffect(() => {
    const newNames = ['Nombre'];
    const newAges = ['Edad'];
    const newColumns = []
    
    crew.forEach((sailor) => {
      newNames.push(sailor.name);
      newAges.push(sailor.age);
    });

    newColumns.push(newNames);
    newColumns.push(newAges);
    setCrewColumns(newColumns);

  }, [crew]);

  return crewColumns
}