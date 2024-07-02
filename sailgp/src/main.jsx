
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TeamsProvider } from './context/TeamsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TeamsProvider>
      <App />
    </TeamsProvider>
  </BrowserRouter>
)
