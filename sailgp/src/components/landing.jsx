
import '../styles/landing.css'



export const Landing = () => {
  
  const circuits = ['CHICAGO', 'LOS ANGELES', 'SAINT-TROPEZ', 'CADIZ', 'DUBAI', 'ABU DHABI', 'SIDNEY', 'CHIRSTCHURCH', 'BERMUDA', 'HALIFAX', 'NEW YORK']

  return (
    <section className="landing">
      <ul>
        {circuits.map((circuit, index)=>(
          <li key={index}>
            <div className='circuit-card'>
              <h2 >{circuit}</h2>
              <img src= "https://images.ctfassets.net/2lppn7hwgzta/5Z65NcMowz20AvRhellMVV/69dacd23175f9a2c0ff6d01df559b7f0/JB2_2070.jpg"alt={circuit}/>
              <div>
                <div>
                  <p className='date-numbers'>24      05      2024</p>
                  <div className='circuit-date'>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <p style={{color:"black"}}>Conditions: Extreme 
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
    </section>
  );
};