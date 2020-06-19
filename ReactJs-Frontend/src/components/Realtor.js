import React, { useState, useEffect } from "react";
import RealtorPropView from "./RealtorPropView";

const Realtor = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [houses, setHouses] = useState([]);

  const getAllTokens = async () => {
    const accounts = await web3.eth.getAccounts();
    const realtorAcc = accounts[1];

    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("total  Sup:", totalSupply);
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenBid = await contract.methods.getBidProcess(token).call();
      if (tokenBid[0] === realtorAcc) {
        theTokens.push(token);
      }
    }
    setHouses(theTokens);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  return (
    <div className="tokenContainer">
      {houses.map((pr, key) => {
        return (
          <RealtorPropView
            tokenId={pr}
            key={key}
            contract={contract}
            web3={web3}
          />
        );
      })}
    </div>
  );
};

export default Realtor;
