import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class AppTableRow extends Component {
    constructor(props) {
        super(props)

        let itemData = props.itemData;
        let currency = itemData.quotes.USD;

        this.state = {
            rank : itemData.rank,
            name: itemData.name,
            price: {
                current: currency.price,
                change: currency.percent_change_24h + '%',
                volume: currency.volume_24h
            },
            market: {
                cap: currency.market_cap
            }
        }
      }
    render() {
        let valueCurrentPrice = <NumberFormat value={this.state.price.current} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />
        let valueMarketCap = <NumberFormat value={this.state.market.cap} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />
        let valueVolumePrice = <NumberFormat value={this.state.price.volume} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />

        return(
            <TableRow>
                <TableRowColumn className="cell-xsmall column-hide-mobile">{this.state.rank}</TableRowColumn>
                <TableRowColumn>{this.state.name}</TableRowColumn>
                <TableRowColumn className="cell-medium column-hide-mobile">{valueCurrentPrice}</TableRowColumn>
                <TableRowColumn className="cell-small">{this.state.price.change}</TableRowColumn>
                <TableRowColumn className="cell-large">{valueMarketCap}</TableRowColumn>
                <TableRowColumn className="cell-large column-hide-mobile">{valueVolumePrice}</TableRowColumn>
            </TableRow>
        )
    }
}
export default AppTableRow;