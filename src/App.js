import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Title from './components/title'
import TotalFunds from './components/totalFunds'
import SliderBar from './components/sliderBar'
import SliderBar2 from './components/sliderBar2'
import { groups } from './dummy_data/groups'

function App() {
  const [funds, setFunds] = useState(1000000000)
  const [percentage, setPercentage] = useState([0, 0, 0, 0])
  const [totalPercentage, setTotalPercentage] = useState(0)

  const handlePercentage = (e, value) => {
    let index = parseInt(e.target.id, 10)
    percentage[index] = value //set percentage array with new percentage at teh index of group chosen by slider

    setPercentage([...percentage.slice(0, index), value, ...percentage.slice(index + 1)])
    let totalValue = percentage.reduce((result, percent) => result + percent)
    let newFunds = 1000000000 - (1000000000 * (totalValue / 100)) //logic to recalc funds based off percentage lost
    setFunds(newFunds) //set value of funs to new calculated value

    setTotalPercentage(totalValue)

  }

  const groupSections = groups.map((group, idx) => {
    return (
      <div key={idx} style={{ display: 'flex' }}>
        <p>{group}: </p>
        <SliderBar handlePercentage={handlePercentage} idx={idx} />
        <p>Percentage: {percentage[idx]}</p>
      </div>
    )
  })

  // const groupSections2 = groups.map( (group, idx) => {
  //   return (
  //     <div key={idx} style={{display: 'flex'}}>
  //       <p>{group}: </p>
  //       <SliderBar2 />
  //       <p>Percentage: TBD</p>
  //     </div>
  //   )
  // })

  console.log(percentage)
  return (
    <div className="App">

      <header className="App-header">
        <Title />
        <TotalFunds funds={funds} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {groupSections}
        </div>
        <div>Total Percentage: {totalPercentage}%</div>
        {/* <div style={{ display: 'flex', flexDirection: 'column'}}>
          {groupSections2}
        </div> */}
      </header>
    </div>
  );
}

export default App;


