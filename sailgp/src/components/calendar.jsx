import { calendar } from "../util/constants"
import '../styles/calendar.css'



export const Calendar = () => {

  const dates = Object.entries(calendar)

  return(
    <div className="calendar">
      <ul>
        {dates.map((date, index)=>(
          <li key={index} style={{
            borderTopRightRadius: date[0] === "DUBAI" ? "15px" : "0px", 
            borderTopLeftRadius: date[0] === "DUBAI" ? "15px" : "0px" ,
            borderBottomRightRadius: date[0] === "ABU DHABI" ? "15px" : "0px", 
            borderBottomLeftRadius: date[0] === "ABU DHABI" ? "15px" : "0px" }}>
            <p>{date[0]}</p>
            <p>{date[1]}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}