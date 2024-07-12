import { useEffect, useState } from "react";
import { searchCircuitByName } from "../services/circuits";



export const useSearchCircuitByName = ( name ) => {
  const [selectedCircuit, setSelectedCircuit ] = useState(null)

  useEffect(()=>{
    let isMounted = true;

    const fetchData = async () => {
      const circuit = await searchCircuitByName(name)
      if (isMounted) {
        setSelectedCircuit(circuit);
      }
    }
    fetchData();

    return () => {
      isMounted = false;
    };
  },[name])

  return selectedCircuit
}