import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Team } from './components/Team'
import { Ranking } from './components/Ranking'
import { Circuit } from './components/Circuit'
import { Circuits } from './components/Circuits'
import { Landing } from './components/landing'


function App() {

  return (
    <main className='main'>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/circuits' element={<Circuits/>}/>
        <Route path='/team/:country' element={<Team/>}/>
        <Route path='/circuits/:circuit' element={<Circuit/>}/>
        <Route path='/ranking' element={<Ranking/>}/>
        <Route path='/*' element={<h2>404 Not Found</h2>}/>
      </Routes>
    </main>
  )
}

export default App
