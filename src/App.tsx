import { TaskBoard } from './components/TaskBoard'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">spikey1335</h1>
        <p className="app__subtitle">A starter Task Board running on the Cloud Agent dev environment.</p>
      </header>
      <TaskBoard />
      <p className="app__hint">
        Edit <code>src/components/TaskBoard.tsx</code> and save — changes hot-reload instantly.
      </p>
    </main>
  )
}

export default App
