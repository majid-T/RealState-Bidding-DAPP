import React, { useState, useEffect } from "react";
import BidderPropView from "./BidderPropView";

const BidderA = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [houses, setHouses] = useState([]);
  const [bidderAccount, setBidderAccount] = useState();

  const getAllTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSup:", totalSupply);
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
    const acc = accounts[2];
    setBidderAccount(acc);
  };

  useEffect(() => {
    setAccount();
    getAllTokens();
  }, []);

  return (
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
  );
};

export default BidderA;
