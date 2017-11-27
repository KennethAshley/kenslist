import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import ItemView from './containers/list_item_view';

import getWeb3 from './utils/getWeb3';
import SaleContract from '../../build/contracts/Sale.json';
import contract from 'truffle-contract';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      web3: null,
      contract: {}
    }

    this.instantiateContract = this.instantiateContract.bind(this);
    this.check = this.check.bind(this);
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      }, () => {
        this.instantiateContract()
      })
    })
  }

  instantiateContract() {
    const sale = contract(SaleContract);
    sale.setProvider(this.state.web3.currentProvider)

    sale.deployed().then((instance) => {
      this.setState({
        contract: instance
      });
    });
  }

  check() {
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.contract.willBuy({from: accounts[0]})
      .then(value => {
        console.log(value);
      })
    });
  }

  render() {
    return (
      <div>
        <Header />
        <button onClick={this.check}>Check</button>
        <Route exact path="/" component={Home} />
        <Route exact path="/view/:name" component={ItemView} />
      </div>
    )
  }
}


export default App;
