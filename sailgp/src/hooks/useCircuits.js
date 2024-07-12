import { useEffect, useState } from "react";
import { searchAllCircuits } from "../services/circuits";



export const useCircuits = () => {
  const [circuits, setCircuits] = useState([])

  const fetchData = async () => {
    const circuits = await searchAllCircuits();
    setCircuits(circuits)
  };

  useEffect(()=>{
    fetchData();
  },[]);

  return circuits
}