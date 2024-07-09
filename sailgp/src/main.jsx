
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TeamsProvider } from './context/TeamsContext.jsx'
import { NavHeader } from './components/NavHeader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TeamsProvider>
      <NavHeader/>
      <App />
    </TeamsProvider>
  </BrowserRouter>
)
