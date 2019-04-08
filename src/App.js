import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    loader: false,
    currencies: []
  };

  handleChange = event => {
    const val = event.target.value;
    this.setState({
      selectValue: val
    });
  };

  fetchData = () => {
    this.setState({
      loader: true
    });
    let initialData = [];
    const url = `http://data.fixer.io/api/latest?access_key=ea263e28e82bbd478f20f7e2ef2b309f&symbols=${
      this.state.selectValue
    }&format=1`;

    console.log("the url is: " + url);
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(findData => {
        initialData = findData.rates;
        this.setState({
          currencies: initialData,
          loader: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { currencies, loader } = this.state;
    let list = null;
    if (loader) {
      list = "loading...";
    } else if (!loader && currencies) {
      list = Object.keys(currencies).map(current => (
        <div id="res" key={current}>
          {current}: {currencies[current]} To 1 EUR
        <br/>
	<br/>
	</div>
	
      ));
    }
    return (
      <div className="App">
        <header className="App-header">
         <h1 id= "mainp" className="App-title"> Welcome to DKK website </h1>
          {list}
          <div className="dropdown">
            <select
              id="select1"
              name="currency"
              value={this.state.selectValue}
              onChange={this.handleChange}
            >
              <option value="EUR">-- Selecting: NILL --</option>
              <option value="CAD">-- Selecting: CAD --</option>
              <option value="SGD">-- Selecting: SGD --</option>
              <option value="AUD">-- Selecting: AUD --</option>
	      <option value="AMD">-- Selecting: AMD --</option>
       	      <option value="IDR">-- Selecting: IDR --</option>
	      <option value="PEN">-- Selecting: PEN --</option>
	      <option value="RUB">-- Selecting: RUB --</option>
	      <option value="THB">-- Selecting: THB --</option>
	      <option value="AFN">-- Selecting: AFN --</option>
	



 </select>
	<br/>
	<br/>
	

          </div>

          <button id="sbutton" className="pressMe" onClick={this.fetchData}>
            Set Button
          </button>
          <br />
          <br />

       </header>
      </div>
    );
  }
}

export default App;
