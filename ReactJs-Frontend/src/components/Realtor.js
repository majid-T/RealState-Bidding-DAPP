import React, { useState, useEffect } from "react";
import RealtorPropView from "./RealtorPropView";

const Realtor = (props) => {
  const web3 = props.web3;
  const contract = props.contract;
  const realtorAccount = props.allAccounts[1];

  const [houses, setHouses] = useState([]);

  const getAllTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("total  Sup:", totalSupply);
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenBid = await contract.methods.getBidProcess(token).call();
      if (tokenBid[0] === realtorAccount) {
        theTokens.push(token);
      }
    }
    setHouses(theTokens);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

  return (
    <div className="container">
      <span className="title_address">Account Realtor: {realtorAccount}</span>
      <div className="tokenContainer">
        {houses.length != 0 ? (
          houses.map((pr, key) => {
            return (
              <RealtorPropView
                tokenId={pr}
                key={key}
                contract={contract}
                web3={web3}
              />
            );
          })
        ) : (
          <p>You have no assigned tokens</p>
        )}
      </div>
    </div>
  );
};

export default Realtor;
