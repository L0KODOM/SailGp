
import {useCalculateTime} from '../hooks/useCalcultateTime'
import '../styles/chrono.css'


export const Chrono = () => {

 

  const {seconds, minutes, hours, days} = useCalculateTime()
  
  

  return(
    <div className="chrono">
      <h3 className='next-circuit'><p style={{color:"yellow", position:"absolute",left:"-5px", bottom:"31px", width:"180px"}}>Siguiente Circuito:</p> San Francisco</h3>
      <img src='/watch.png' alt='watch' className='watch'/>
      <img src='/image.png' alt='agujas' className = 'agujas'/>
      <div className="countdown-container">
        <p className="cowntdown">{days}</p>
        <p className="countdown-desc">DÍAS</p>
      </div>
      <div className="separator">
        <p>:</p>
      </div>
      <div className="countdown-container">
        <p className="cowntdown">{hours}</p>
        <p className="countdown-desc">HORAS</p>
      </div>
      <div className="separator">
        <p>:</p>
      </div>
      <div className="countdown-container">
        <p className="cowntdown">{minutes}</p>
        <p className="countdown-desc">MINUTOS</p>
      </div>
      <div className="separator">
        <p>:</p>
      </div>
      <div className="countdown-container">
        <p className="cowntdown">{seconds}</p>
        <p className="countdown-desc">SEGUNDOS</p>
      </div>
      <style>
        
      </style>
    </div>
  )

}