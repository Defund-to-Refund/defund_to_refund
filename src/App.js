import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


import Title from './components/title'
import TotalFunds from './components/totalFunds'
import SliderBar from './components/sliderBar'
import { groups } from './dummy_data/groups'
// import bokeh_data1 from './data/bokeh_data.json'
// import bokeh_data2 from './data/bokeh_data.json'
// import bokeh_data3 from './data/bokeh_data.json'
import bokeh_data4 from './data/bokeh_data4.json'
import Dropdown from './components/dropdown/dropdown'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      funds: 1000000000,
      percentage: [0, 0, 0, 0],
      dataset: 1
    }
  }

  handlePercentage = (e, value) => {
    let index = parseInt(e.target.id, 10)
    this.setState({percentage: [...this.state.percentage.slice(0, index), value, ...this.state.percentage.slice(index + 1)]})
  }

  handleDataSet = (e) => {
    console.log(e.target.value)
    this.setState({dataset: e.target.value})
  }
  /* MAY NOT NEED TO USE THIS COMPONENT
  componentDidMount(){
    window.Bokeh.embed.embed_item(bokeh_data, 'myplot');
  }
  */
  componentDidUpdate(){
    /*
   if(this.state.dataset == 1) {
     window.Bokeh.embed.embed_item(bokeh_data1, 'myplot');
    } else if (this.state.dataset == 2) {
      window.Bokeh.embed.embed_item(bokeh_data2, 'myplot')
    } else if (this.state.dataset == 3) {
      window.Bokeh.embed.embed_item(bokeh_data3, 'myplot')
    } else if (this.state.dataset == 4) {
      window.Bokeh.embed.embed_item(bokeh_data4, 'myplot')
    }
    */
    if(this.state.dataset === 4) {
      window.Bokeh.embed.embed_item(bokeh_data4, 'myplot');
    }
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
          <Dropdown handleDataSet={this.handleDataSet}/>
          <br />
          <div id="myplot" />
        </header>
      </div>
    );
  }
}

export default App;
