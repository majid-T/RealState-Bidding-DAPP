import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Owner from "./components/Owner";
import Realtor from "./components/Realtor";
import BidderA from "./components/BidderA";
import BidderB from "./components/BidderB";
import Navigation from "./components/Navigation";
import Web3 from "web3";
import RealEstateBidding from "./RealEstateBidding.json";

function App() {
  const port = 7545; // If using Ganache GUI use 8545 for port
  const web3 = new Web3("http://localhost:" + port);
  let contract;
  const allAccounts = [];

  const loadBlockchainData = async () => {
    // Load accounts
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    //Setting all accounts
    const accounts = await web3.eth.getAccounts();
    const mintingAccount = accounts[0];
    allAccounts.push(mintingAccount);
    const realtorAccount = accounts[1];
    allAccounts.push(realtorAccount);
    const bidder1Account = accounts[2];
    allAccounts.push(bidder1Account);
    const bedder2Account = accounts[3];
    allAccounts.push(bedder2Account);

    const networkData = RealEstateBidding.networks[networkId];

    if (networkData) {
      const abi = RealEstateBidding.abi;
      //This will change on every deployment
      const address = "0xfB52dAcB9902c5D041Ea87ebAA85bD75Dc8F40Ee";
      contract = await new web3.eth.Contract(abi, address);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  loadBlockchainData();

  return (
    <BrowserRouter>
      <Navigation />

      <div className="mainPanel">
        <Switch>
          <Route
            path="/Owner"
            render={(props) => (
              <Owner
                {...props}
                web3={web3}
                contract={contract}
                allAccounts={allAccounts}
              />
            )}
          />
          <Route
            path="/Realtor"
            render={(props) => (
              <Realtor
                {...props}
                web3={web3}
                contract={contract}
                allAccounts={allAccounts}
              />
            )}
          />
          <Route
            path="/BidderA"
            render={(props) => (
              <BidderA
                {...props}
                web3={web3}
                contract={contract}
                allAccounts={allAccounts}
              />
            )}
          />
          <Route
            path="/BidderB"
            render={(props) => (
              <BidderB
                {...props}
                web3={web3}
                contract={contract}
                allAccounts={allAccounts}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
