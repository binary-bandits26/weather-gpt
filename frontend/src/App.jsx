import { Routes, Route } from 'react-router'
import './App.css'
import Landing from './pages/landing'
import Chat from './pages/chat'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
