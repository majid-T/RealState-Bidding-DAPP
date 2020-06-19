import React, { useState, useEffect } from "react";
import BidderPropView from "./BidderPropView";
import OwnerPropView from "./OwnerPropView";

const BidderB = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [houses, setHouses] = useState([]);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [bidderAccount, setBidderAccount] = useState();

  const getAllTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenBid = await contract.methods.getBidProcess(token).call();
      if (tokenBid[1] == true) {
        theTokens.push(token);
      }
    }
    setHouses(theTokens);
  };

  const setAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    const acc = accounts[3];
    setBidderAccount(acc);
  };

  const getOwnedTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenOwner = await contract.methods.ownerOf(token).call();
      if (tokenOwner === bidderAccount) {
        theTokens.push(token);
      }
    }
    setOwnedTokens(theTokens);
  };

  useEffect(() => {
    setAccount();
    getAllTokens();
    getOwnedTokens();
  }, []);

  return (
    <div className="container">
      <h2>Owned Tokens</h2>
      <div className="tokenContainer">
        {ownedTokens.map((pr, key) => {
          return (
            <OwnerPropView
              tokenId={pr}
              key={key}
              contract={contract}
              web3={web3}
            />
          );
        })}
      </div>

      <h2>Tokens on Market</h2>
      <div className="tokenContainer">
        {houses.map((pr, key) => {
          return (
            <BidderPropView
              tokenId={pr}
              key={key}
              contract={contract}
              web3={web3}
              bidderAccount={bidderAccount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BidderB;
