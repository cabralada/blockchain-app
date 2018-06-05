import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip } from 'recharts';
import NumberFormat from 'react-number-format';

class Liquidity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screen : {
                width: window.innerWidth - 60,
                height: window.innerHeight/1.5,
            },
            data : props.data
        }
    }

    render() {
        let liquityData = this.props.data;
        let data = Object.keys(liquityData)
            .map((item, index) => (
                { 
                    x: liquityData[item].ticket.quotes.USD.market_cap,
                    y: liquityData[item].ticket.quotes.USD.volume_24h,
                    z: liquityData[item].ticket.quotes.USD.percent_change_24h,
                    name: liquityData[item].ticket.name,
                    marketcap: liquityData[item].ticket.quotes.USD.market_cap,
                    range: liquityData[item].ticket.quotes.USD.percent_change_24h,
                    volume: liquityData[item].ticket.quotes.USD.volume_24h
                }
            ));

        const CustomTooltip = props => {
            if (props.payload.length === 0) return <div className="custom-tooltip">Loading ... </div>

            let baseData = props.payload[0].payload;
            let name = baseData.name;
            let marketcap = baseData.marketcap;
            let range = baseData.range;
            let volume = baseData.volume;

            return (
                <div className="custom-tooltip">
                    <p className="label">{name}</p>
                    <p className="marketcap"><NumberFormat value={marketcap} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} /></p>
                    <p className="volume"><NumberFormat value={volume} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} /></p>
                    <p className="range-price">{range}%</p>
                </div>
            )
        }

        return (
            <div>
                <ScatterChart
                    width={this.state.screen.width}
                    height={this.state.screen.height}
                    margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid />
                    <XAxis dataKey={'x'} tick={{fontSize:0}} label={{ value: 'Market Cap', position: 'insideBottom' }}/>
                    <YAxis dataKey={'y'} tick={{fontSize:0}} label={{ value: 'Volume', angle: -90, position: 'insideLeft' }} />>
                    <ZAxis dataKey={'z'} range={[100, 500]}/>
                    <Scatter name='WATTx liquidity' data={data} fill='#8884d8'/>
                    <Tooltip content={<CustomTooltip info={data} />}/>
                </ScatterChart>
            </div>
        )
    }
}

export default Liquidity;
