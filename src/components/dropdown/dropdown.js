import React from 'react';
import './style.css';


class Dropdown extends React.Component {
constructor(props){
 super(props);

 this.state = {
       displayMenu: false,
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};
showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="dropdown" style = {{background:"red",width:"200px"}} >
         <div className="button" onClick={this.showDropdownMenu}> Select Graph </div>

          { this.state.displayMenu ? (
          <ul>
         <li style={{ color: 'black'}} value="1" onClick={this.props.handleDataSet}>Graph 1</li>
         <li style={{ color: 'black'}} value="2" onClick={this.props.handleDataSet}>Graph 2</li>
         <li style={{ color: 'black'}} value="3" onClick={this.props.handleDataSet}>Graph 3</li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;
