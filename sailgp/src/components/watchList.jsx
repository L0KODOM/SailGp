import { watchList } from "../util/constants"




export const WatchList = () => {

  const list = Object.entries(watchList)

  return(
    <div className="watchList">
      <ul>
        {list.map((web, index)=>(
          <li key={index}>
            <div className="watch-element">
              <img src={web[1].thumb} alt="thumb" />
              <a href={web[1].link}>{web[1].text}</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}