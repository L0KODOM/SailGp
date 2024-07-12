import { useState } from 'react'
import '../styles/landing.css'
import { Calendar } from './calendar'
import { WatchList } from './watchList'



export const Landing = () => {
  const [showCalendar, setShowCalendar] = useState(false)


  const handleClickCalendar = () => {
    setShowCalendar(!showCalendar)
  }


  return(
    <section className="landing">
      <div>
        <iframe
          width="460"
          height="415"
          src={`https://www.youtube.com/embed/Q_pOQj6WSbk`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      </div>
      <div>
        <button onClick={handleClickCalendar}>SEASON 5 CALENDAR</button>
        {showCalendar ?
        <Calendar />
        : 
        <WatchList/>
        }
      </div>
      <div>
        <iframe
          width="460"
          height="415"
          src={`https://www.youtube.com/embed/Rg3lTCaI-lo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video"
        ></iframe>
      </div>
    </section>
  )
}