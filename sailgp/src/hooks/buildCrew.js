import { useEffect, useState } from "react"
import { crewPositions } from "../util/constants"

export const useBuildCrew = (crew) => {

  const [builtCrew, setBuiltCrew] = useState({});

  useEffect(() => {
    const create = () => {
      const newCrew = {};
      crew.forEach((sailor, index) => {
        if (!newCrew[sailor.name]) {
          newCrew[sailor.name] = {name: sailor.name, age: sailor.age, position: crewPositions[index]}
        }
      })
      setBuiltCrew(newCrew);
    };
    create();
  },[crew]);

  return Object.entries(builtCrew)
}
