import { NavLink } from "react-router-dom"
import '../styles/navheader.css'


export const NavHeader = () => {

  return(
    <div className="navheader">
      <NavLink to={"/"}>
        <img src="https://images.ctfassets.net/2lppn7hwgzta/58zlbktS7RiHV9j36zMXw3/2dd1cb7f97607f28abfcc9941abeb26a/SailGP_Logo_White__1_PADDING.png" alt="logo"/>
      </NavLink>
      <div>
        <h2>Menu</h2>
        <i className="material-icons">menu</i>
      </div>
    </div>
  )
}