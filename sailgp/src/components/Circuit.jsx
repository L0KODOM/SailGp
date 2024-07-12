
import { NavLink, useParams } from 'react-router-dom';
import { useSearchCircuitByName } from '../hooks/useSearchCircuitByName'; 
import { useCreateCircuitLists } from '../hooks/useCreateCircuitLists'; 
import '../styles/circuit.css'

export const Circuit = () => {
  const { circuit } = useParams();
  const selectedCircuit = useSearchCircuitByName(circuit);
  const resultLists = useCreateCircuitLists(selectedCircuit?.results);

  const keys = ['Equipos', 'Posición', 'Puntos']

  if (!selectedCircuit) {
    return <p>...Loading</p>;
  }

  return (
    <section className='circuit-section'>
      <style>
        {`
        .main {
            background: 
              linear-gradient(rgba(1, 26, 2, 0.5), rgba(13, 34, 16, 0.5)),
              url(${selectedCircuit.picture ? selectedCircuit.picture : "https://www.livingpuramadera.com/wp-content/uploads/2021/10/sailgp2.jpg"});
          }
        `}
      </style>
      <h2>{selectedCircuit.name}</h2>
      <ul>
        {resultLists.map((value, index)=>(
          <div key={index}>
            {value.map((data, index)=>(
            <li key={index}>
              {keys.includes(data)?
                <p className='keys'>{data}</p>
                : resultLists[0].includes(data)
                ? <NavLink to={`/team/${data}`}><p className='teams-values'>{data}</p></NavLink>
                : <p className='values'>{data}</p>
               }
            </li>
            ))}
          </div>
        ))}
      </ul>
    </section>
  );
};