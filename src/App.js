import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Bokeh from '@bokeh/bokehjs'
import Title from './components/title'
import TotalFunds from './components/totalFunds'
import SliderBar from './components/sliderBar'
import { groups } from './dummy_data/groups'
import bokeh_data from './data/bokeh_data.json'

class App extends React.Component {
  state = {
    funds: 1000000000,
    percentage: [0, 0, 0, 0]
  }

  handlePercentage = (e, value) => {
    let index = parseInt(e.target.id, 10)
    this.setState({percentage: [...this.state.percentage.slice(0, index), value, ...this.state.percentage.slice(index + 1)]})
  }

  componentDidMount(){
    Bokeh.embed.embed_item(bokeh_data);
  }

  render() {
    // const [funds, setFunds] = useState(1000000000)
    // const [percentage, setPercentage] = useState([0, 0, 0, 0])

    /*
    const handlePercentage = (e, value) => {
      let index = parseInt(e.target.id, 10)
      setPercentage([...percentage.slice(0, index), value, ...percentage.slice(index + 1)])
    }
    */

    const groupSections = groups.map((group, idx) => {
      return (
        <div key={idx} style={{ display: 'flex' }}>
          <p>{group}: </p>
          <SliderBar handlePercentage={this.handlePercentage} idx={idx} />
          <p>Percentage: {this.state.percentage[idx]}</p>
        </div>
      )
    })

    return (
      <div className="App">

        <header className="App-header">
          <Title />
          <TotalFunds funds={this.state.funds} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {groupSections}
          </div>
          <div id="myplot" />
        </header>
      </div>
    );
  }
}

export default App;
