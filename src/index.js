import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

import './index.css';
import Market from './components/Market/Market';
import Liquidity from './components/Liquidity/Liquidity';
import registerServiceWorker from './registerServiceWorker';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CircularProgress from 'material-ui/CircularProgress';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

class MainMarket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            button: {
                market: 'Market',
                liquidity: 'Liquidity',
            },
            dropDown: {
                value: 1
            },
            data: [],
            customData: []
        }
    }

    handleChange = (event, index, value) => {
        this.setState({
            dropDown: {
                value
            }
        })

        this.collectInfo(value);
    };

    collectInfo(elem) {
        let url;

        if (elem === 1) {
            url = `https://api.coinmarketcap.com/v2/ticker/`;
        } else {
            url = `https://api.coinmarketcap.com/v2/ticker/?limit=${elem}`;
        }

        axios.get(url)
            .then(res => {
                this.setState({ 
                    customData : res.data.data
                 });
            }).then(() => {
                let customData = Object.keys(this.state.customData)
                    .map((item, index) => (
                        { ticket: this.state.customData[item] }
                    ));
                this.setState({ customData });
            }).then(() => {
                let data = this.state.customData;

                data.sort(function(a, b){
                    return a.ticket.rank-b.ticket.rank
                });

                this.setState({ data });
            })
    }

    componentDidMount() {
        this.collectInfo(this.state.dropDown.value);
    }

    render() {
        const componentMarket = (props) => {
            return (
                <Market 
                    data = {this.state.data}
                />
            );
        }

        const componentChart = (props) => {
            return (
                <Liquidity 
                    data = {this.state.data}
                />
            );
        }

        let sizeData = Object.keys(this.state.data).length;
        
        if (sizeData === 0) {
            return (
                <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
                    <CircularProgress color="#CE370E" className="loader" />
                </MuiThemeProvider>
            )
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
                <StyleBase>
                    <AppBar
                        style = {styleAppBar}
                        iconElementRight = {
                            <span className="top-navigation">
                                <Link className='btn' to="/">
                                    {this.state.button.market}
                                </Link>

                                <Link className='btn' to="/liquidity">
                                    {this.state.button.liquidity}
                                </Link>
                            </span>
                        }
                        showMenuIconButton={false} 
                        title={<img alt='wattx' src="https://wattx.io/assets/toolkit/images/wattx-logo.svg" />} />

                    <StyleApp>
                        <div className="fix-width filter-area">
                            <FilterLabel>Filter result</FilterLabel>
                            <DropDownMenu value={this.state.dropDown.value} onChange={this.handleChange}>
                                <MenuItem value={1} primaryText="All" />
                                <MenuItem value={10} primaryText="10" />
                                <MenuItem value={50} primaryText="50" />
                                <MenuItem value={100} primaryText="100" />
                            </DropDownMenu>
                        </div>

                        <Switch>
                            <Route exact path="/" render={componentMarket} />
                            <Route exact path="/liquidity" component={componentChart} />
                            <Route component={NoMatch} />
                        </Switch>
                    </StyleApp>
                </StyleBase>
            </MuiThemeProvider>
        );
    }
};

export default MainMarket;

ReactDOM.render(
    <Router>
        <MainMarket />
    </Router>, document.getElementById('root'));

registerServiceWorker();

const NoMatch = ({ location }) => (
    <div>
        <p> Ops!! 404. <code>{location.pathname}</code> </p>
        <Link to="/"> back to home </Link>
    </div>
);

const StyleBase = styled.div`
    .btn {
        background-color: #CE370E;
        color: white;
        margin-left: 5px;
        display: inline-block;
        padding: 10px 15px;
        margin-top: 5px;
        text-decoration: none;

        &:hover {
            @media (min-width: 1000px) {
                background: black;
            }
        }
    }
`;

const StyleApp = styled.section`
    margin: 0 2rem 2rem;

    @media (min-width: 1000px) {
        margin: 0 auto 2rem;
    }

    .fix-width {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
    }

`;

const FilterLabel = styled.span`
    line-height: 50px;
    float: left
`;


const styleAppBar = {
    backgroundColor: 'white',
    boxShadow: 0,
    marginBottom: '2rem',
    color: '#000000',
    borderBottom: '1px solid #eeeeee'
}


