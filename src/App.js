import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './Chart';
import Metrics from './Metrics';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTicker: "BTC",
      BTCurl: "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100&api_key=60d1211ade36a85386d9df3f21ed1f06db1419ff6d39cd5f0389027098559670",
      ETHurl: "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=100&api_key=60d1211ade36a85386d9df3f21ed1f06db1419ff6d39cd5f0389027098559670",
      LTCurl: "https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=100&api_key=60d1211ade36a85386d9df3f21ed1f06db1419ff6d39cd5f0389027098559670",
      currentHistURL: "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=100&api_key=60d1211ade36a85386d9df3f21ed1f06db1419ff6d39cd5f0389027098559670",
      BTCgraphData: [],
      ETHgraphData: [],
      LTCgraphData: [],
      BTCxyObj: [],
      ETHxyObj: [],
      LTCxyObj: [],
      xyObj: [],
      currentPrice: null,
      currentMetrics: null,
      current24HrHigh: null,
      current24HrLow: null,
      currentPctChange: null,
      currentSupply: null,
      currentMktCap: null,
      current24HrVolume: null,
      BTCmetricsArr: [],
      ETHmetricsArr: [],
      LTCmetricsArr: []
    }

    this.BTCURLChange = this.BTCURLChange.bind(this);
    this.ETHURLChange = this.ETHURLChange.bind(this);
    this.LTCURLChange = this.LTCURLChange.bind(this);

    
  }

 
  // making an API call from within componentDidMount
  componentDidMount() {
    let BTCpointsArr = [];
    let ETHpointsArr = [];
    let LTCpointsArr = [];
    
    // get BTC historic data
    fetch(this.state.currentHistURL)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        
        
        for (var i = 0; i < 100; i++) {
          BTCpointsArr.push({ x: i, y: result.Data[i].close})
        }
        this.setState({BTCprice: result.Data[100].close, currentPrice: result.Data[100].close, BTCxyObj: BTCpointsArr, xyObj: BTCpointsArr});
        
      })

      // get ETH historic data
      fetch(this.state.ETHurl)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        
        
        for (var i = 0; i < 100; i++) {
          ETHpointsArr.push({ x: i, y: result.Data[i].close})
        }
        this.setState({ETHprice: result.Data[100].close, ETHxyObj: ETHpointsArr});
        
      })

      // get LTC historic data
      fetch(this.state.LTCurl)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        
        
        for (var i = 0; i < 100; i++) {
          LTCpointsArr.push({ x: i, y: result.Data[i].close})
        }
        this.setState({LTCprice: result.Data[100].close, LTCxyObj: LTCpointsArr});
        
      })


      // get metrics for all coins
      fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC&tsyms=USD&api_key=60d1211ade36a85386d9df3f21ed1f06db1419ff6d39cd5f0389027098559670")
      .then((res) => {
        return res.json();
      })
      .then((result) => {

        this.state.BTCmetricsArr.push(
          result.DISPLAY.BTC.USD.HIGH24HOUR, 
          result.DISPLAY.BTC.USD.LOW24HOUR, 
          result.DISPLAY.BTC.USD.CHANGEPCT24HOUR, 
          result.DISPLAY.BTC.USD.SUPPLY,
          result.DISPLAY.BTC.USD.MKTCAP,
          result.DISPLAY.BTC.USD.TOTALVOLUME24H
        )

        this.state.ETHmetricsArr.push(
          result.DISPLAY.ETH.USD.HIGH24HOUR, 
          result.DISPLAY.ETH.USD.LOW24HOUR, 
          result.DISPLAY.ETH.USD.CHANGEPCT24HOUR, 
          result.DISPLAY.ETH.USD.SUPPLY,
          result.DISPLAY.ETH.USD.MKTCAP,
          result.DISPLAY.ETH.USD.TOTALVOLUME24H
        )

        this.state.LTCmetricsArr.push(
          result.DISPLAY.LTC.USD.HIGH24HOUR, 
          result.DISPLAY.LTC.USD.LOW24HOUR, 
          result.DISPLAY.LTC.USD.CHANGEPCT24HOUR, 
          result.DISPLAY.LTC.USD.SUPPLY,
          result.DISPLAY.LTC.USD.MKTCAP,
          result.DISPLAY.LTC.USD.TOTALVOLUME24H
        )
        
        
        
        this.setState({
          BTCmetrics: this.state.BTCmetricsArr, 
          currentMetrics: this.state.BTCmetricsArr, 
          ETHmetrics: result.DISPLAY.ETH, 
          LTCmetrics: result.DISPLAY.LTC,
          current24HrHigh: this.state.BTCmetricsArr[0],
          current24HrLow: this.state.BTCmetricsArr[1],
          currentPctChange: this.state.BTCmetricsArr[2],
          currentSupply: this.state.BTCmetricsArr[3],
          currentMktCap: this.state.BTCmetricsArr[4],
          current24HrVolume: this.state.BTCmetricsArr[5]
        });
        
      })


  }

  

  // change API urls
  BTCURLChange() {
    this.setState({
      xyObj: this.state.BTCxyObj, 
      currentPrice: this.state.BTCprice, 
      currentTicker: "BTC",
      current24HrHigh: this.state.BTCmetricsArr[0],
      current24HrLow: this.state.BTCmetricsArr[1],
      currentPctChange: this.state.BTCmetricsArr[2],
      currentSupply: this.state.BTCmetricsArr[3],
      currentMktCap: this.state.BTCmetricsArr[4],
      current24HrVolume: this.state.BTCmetricsArr[5]
    });
    //this.updatePointData(this.state.currentHistURL);
  }

  ETHURLChange() {
    this.setState({
      xyObj: this.state.ETHxyObj, 
      currentPrice: this.state.ETHprice, 
      currentTicker: "ETH",
      current24HrHigh: this.state.ETHmetricsArr[0],
      current24HrLow: this.state.ETHmetricsArr[1],
      currentPctChange: this.state.ETHmetricsArr[2],
      currentSupply: this.state.ETHmetricsArr[3],
      currentMktCap: this.state.ETHmetricsArr[4],
      current24HrVolume: this.state.ETHmetricsArr[5]
    });
    //this.updatePointData(this.state.currentHistURL);
  }

  LTCURLChange() {
    this.setState({
      xyObj: this.state.LTCxyObj, 
      currentPrice: this.state.LTCprice, 
      currentTicker: "LTC",
      current24HrHigh: this.state.LTCmetricsArr[0],
      current24HrLow: this.state.LTCmetricsArr[1],
      currentPctChange: this.state.LTCmetricsArr[2],
      currentSupply: this.state.LTCmetricsArr[3],
      currentMktCap: this.state.LTCmetricsArr[4],
      current24HrVolume: this.state.LTCmetricsArr[5]
    });
    //this.updatePointData(this.state.currentHistURL);
  }

  render() {
    return (
      <div className="App">
      <div className="container-fluid">
        {/* Coin switch buttons (nav) */}
        <ul className="nav justify-content-center text-white">
        <li className="nav-item">
          <a className="nav-link" onClick={this.BTCURLChange}>BTC</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.ETHURLChange}>ETH</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={this.LTCURLChange}>LTC</a>
        </li>
        
      </ul>
          {/* price display and metrics row */}
          <div className="row">
            <div className="col-3">
              <div className="priceContainer">
                <div className="labelAndPrice">

                  <h5 className="display-5">{this.state.currentTicker} to USD</h5>
                  <h3 className="display-3">${this.state.currentPrice}</h3>
                
                </div>
              </div>
            </div>
            <div className="col-6">
              <Metrics 
                data={this.state.currentMetrics}
                high={this.state.current24HrHigh}
                low={this.state.current24HrLow}
                change={this.state.currentPctChange}
                supply={this.state.currentSupply}
                marketCap={this.state.currentMktCap}
                volume={this.state.current24HrVolume}
              />
            </div>
            <div className="col-3"></div>
          </div>      
          <hr />
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
            <h1 className="text-white">{this.state.currentTicker} over the last 100 days</h1>
            <Chart points={this.state.xyObj}/>
            </div>
            <div className="col-2"></div>
          </div>
      
      </div>
      
      <div className='chart'>
        
      </div>
      
      </div>
    );
  }
}

export default App;
