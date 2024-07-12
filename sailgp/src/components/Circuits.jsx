
import '../styles/circuits.css'
import { useCircuits } from "../hooks/useCircuits";
import { NavLink } from 'react-router-dom';
import { Chrono } from './Chrono';



export const Circuits = () => {

  const fetchedCircuits = useCircuits()

  return (
    <section className="landing">
      <Chrono />
      <ul>
        {fetchedCircuits.map((circuit)=>(
          <NavLink 
            to={`/circuits/${circuit.name}`}
            key= {circuit.id}>
              <li>
                <div className='circuit-card'>
                  <h2 >{circuit.name}</h2>
                  <img src={circuit.picture}  alt={circuit.name}/>
                  <div>
                    <div>
                      <p className='date-numbers'>24      05      2024</p>
                      <div className='circuit-date'>
                        <div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <p style={{color:"black"}}>Conditions: {circuit.conditions}</p>
                  </div>
                </div>
              </li>
          </NavLink>
          
        ))}
      </ul>
      
    </section>
  );
};