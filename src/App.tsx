import { useEffect, useState } from 'react'
import { myGrammar } from './ohm'
import './App.css'

function App() {
  const [ohmValue, setOhmValue] = useState('')
  const [ohmResult, setOhmResult] = useState('')

  useEffect(() => {
    const m = myGrammar.match(ohmValue);

    if (m.succeeded()) {
      setOhmResult('Matched!');
    } else {
      setOhmResult('Did not match!');
    }
  }, [ohmValue])

  return (
    <>
      <h3>OHM</h3>
      <input type="text" value={ohmValue} onChange={(e) => {
        setOhmValue(e.target.value);
      }} />
      <p>Result:</p>
      <p>{ohmResult}</p>
    </>
  )
}

export default App
