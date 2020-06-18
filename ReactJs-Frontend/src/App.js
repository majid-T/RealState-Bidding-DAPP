import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Owner from "./components/Owner";
import Realtor from "./components/Realtor";
import Bidder from "./components/Bidder";
import Buyer from "./components/Buyer";
import Navigation from "./components/Navigation";
import Web3 from "web3";
import { REALSTATE_BID_ABI, CONTRACT_ADDRESS } from "./contract.js";

function App() {
  const port = 7545; // If using Ganache GUI use 8545 for port
  const web3 = new Web3("http://localhost:" + port);
  //Getting the contract from ganache by ABI and address
  const theContract = new web3.eth.Contract(
    REALSTATE_BID_ABI,
    CONTRACT_ADDRESS
  );

  console.log(web3);
  console.log(theContract);

  return (
    <BrowserRouter>
      <Navigation />

      <div className="mainPanel">
        <Switch>
          <Route exact path="/Owner" component={Owner} />
          <Route path="/Realtor" component={Realtor} />
          <Route path="/Bidder" component={Bidder} />
          <Route path="/Buyer" component={Buyer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
