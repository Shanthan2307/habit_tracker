import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StartHabit from './pages/StartHabit'
import SubmitProof from './pages/SubmitProof'
import Validator from './pages/Validator'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)

  return (
    <Router>
      <div className="app">
        <Navigation account={account} setAccount={setAccount} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home account={account} contract={contract} setContract={setContract} />} />
            <Route path="/start-habit" element={<StartHabit account={account} contract={contract} />} />
            <Route path="/submit-proof" element={<SubmitProof account={account} contract={contract} />} />
            <Route path="/validator" element={<Validator account={account} contract={contract} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
