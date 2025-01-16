import { useEffect, useState } from 'react'
import { myGrammar } from './ohm'
import { FormulaController } from './antlr/FormulaController'
import './App.css'

const VALUES = {
  aa: 1,
  bb: 2,
  cc: 3,
  dd: 4
};

function App() {
  const [ohmValue, setOhmValue] = useState('#aa$ + (#bb$ * 2) + SUM(1, 2, (#cc$ * #dd$))')
  const [ohmResult, setOhmResult] = useState('')

  useEffect(() => {
    const formula = new FormulaController({ formula: ohmValue, values: VALUES });
    const result = formula.compute();
    console.log('result', result);
  }, [ohmValue])

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
