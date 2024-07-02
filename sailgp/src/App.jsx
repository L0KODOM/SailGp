import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Landing } from './components/landing'
import { Team } from './components/Team'
import { Ranking } from './components/Ranking'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/team/:country' element={<Team/>}/>
        <Route path='/ranking' element={<Ranking/>}/>
        <Route path='/*' element={<h2>404 Not Found</h2>}/>
      </Routes>
    </>
  )
}

export default App
