import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Title from './components/title'
import TotalFunds from './components/totalFunds'
import SliderBar from './components/sliderBar'
import { groups } from './dummy_data/groups'

function App() {
  const [ funds, setFunds ] = useState(1000000000)
  const [ percentage, setPercentage] = useState([0, 0, 0, 0])

  const handlePercentage = (e, value) => {
    let index = parseInt(e.target.id, 10)
    setPercentage([...percentage.slice(0, index), value, ...percentage.slice(index+1)])
  }

  const groupSections = groups.map( (group, idx) => {
    return (
      <div key={idx} style={{display: 'flex'}}>
        <p>{group}: </p>
        <SliderBar handlePercentage={handlePercentage} idx={idx}/>
        <p>Percentage: {percentage[idx]}</p>
      </div>
    )
  })

  console.log(percentage)
  return (
    <div className="App">

      <header className="App-header">
        <Title />
        <TotalFunds funds={funds} />
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {groupSections}
        </div>
      </header>
    </div>
  );
}

export default App;
