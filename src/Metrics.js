import React, { Component } from 'react';


class Metrics extends Component {
    constructor(props) {
        super(props);
        
        
    }

    
    
    render() {
        
        return(
            
            <table className="table table-dark">
            <tbody>
              <tr>
                <th scope="row">24 Hour High</th>
                <td>{this.props.high}</td>
                <th>Supply</th>
                <td>{this.props.supply}</td>
              </tr>
              <tr>
                <th scope="row">24 Hour Low</th>
                <td>{this.props.low}</td>
                <th>Market Cap</th>
                <td>{this.props.marketCap}</td>
              </tr>
              <tr>
                <th scope="row">24 Hour Change %</th>
                <td>{this.props.change}</td>
                <th>24 Hour Volume</th>
                <td>{this.props.volume}</td>
              </tr>
            </tbody>
          </table>  
            
        )
    }
}

export default Metrics;