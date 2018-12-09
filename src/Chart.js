import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';

class Chart extends Component {
    constructor(props) {
        super(props);

        

        
    }

    
    

   
    render() {
        
        return(
            <XYPlot onMouseLeave={this._onMouseLeave}
                margin={{left:50}}
                width={850}
                height={350}
                animation>
                <VerticalGridLines style={{stroke: '#BA01FF'}} />
                <HorizontalGridLines style={{stroke: '#BA01FF'}} />
                <XAxis style={{stroke: '#BA01FF'}}/>
                <YAxis style={{stroke: '#BA01FF'}}/>
                <LineSeries
                    data={this.props.points}
                    style={{stroke: '#BA01FF'}}/>
                
            </XYPlot>
                
        )
    }
}

export default Chart;