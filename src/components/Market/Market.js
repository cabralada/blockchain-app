import React, { Component } from 'react';
import styled from "styled-components";

import MarketTableRow from './MarketTableRow';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow
} from 'material-ui/Table';

const StyleTable = styled.section`
    .column-hide-mobile {
        display: none;

        @media (min-width: 600px) {
            display:table-cell;
        }
    }
`;

class Market extends Component {
    render() {
        return (
            <StyleTable className = "fix-width">
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="cell-xsmall column-hide-mobile">#</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn className="cell-medium column-hide-mobile">Price</TableHeaderColumn>
                            <TableHeaderColumn className="cell-small" >% <strong>(24h)</strong></TableHeaderColumn>
                            <TableHeaderColumn className="cell-large">Market Cap</TableHeaderColumn>
                            <TableHeaderColumn className="cell-large column-hide-mobile">Volume <strong>(24h)</strong></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody 
                      displayRowCheckbox={false}>
                        {
                            Object.keys(this.props.data).map((item, index) => {
                                return <MarketTableRow key={index} itemData={this.props.data[item].ticket} />;
                            })
                        }
                    </TableBody>
                </Table>
            </StyleTable>
        );
    }
}

export default Market;
