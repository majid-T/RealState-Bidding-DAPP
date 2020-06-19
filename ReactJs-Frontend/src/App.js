import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Owner from "./components/Owner";
import Realtor from "./components/Realtor";
import Bidder from "./components/Bidder";
import Buyer from "./components/Buyer";
import Navigation from "./components/Navigation";
import Web3 from "web3";
import RealEstateBidding from "./RealEstateBidding.json";

function App() {
  const port = 7545; // If using Ganache GUI use 8545 for port
  const web3 = new Web3("http://localhost:" + port);
  let contract;

  const loadBlockchainData = async () => {
    // Load accounts
    const networkId = await web3.eth.net.getId();
    console.log(networkId);

    const networkData = RealEstateBidding.networks[networkId];

    if (networkData) {
      console.log(networkData);
      const abi = RealEstateBidding.abi;
      //This will change on every deployment
      const address = "0xBf8d5bb93F6Bd59EE6dBCEa7Aa5910e885887502";
      console.log(address);
      contract = await new web3.eth.Contract(abi, address);
      console.log(contract);
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
              <Owner {...props} web3={web3} contract={contract} />
            )}
          />
          <Route
            path="/Realtor"
            render={(props) => (
              <Realtor {...props} web3={web3} contract={contract} />
            )}
          />
          <Route
            path="/Bidder"
            render={(props) => (
              <Bidder {...props} web3={web3} contract={contract} />
            )}
          />
          <Route
            path="/Buyer"
            render={(props) => (
              <Buyer
                {...props}
                web3={web3}
                contract={contract}
                theName={"majid"}
              />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
