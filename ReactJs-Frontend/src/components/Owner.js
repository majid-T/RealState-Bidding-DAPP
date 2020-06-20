import React, { useState, useEffect } from "react";
import OwnerPropView from "./OwnerPropView";

const Owner = (props) => {
  const web3 = props.web3;
  const contract = props.contract;
  const ownerAccount = props.allAccounts[0];

  const [houses, setHouses] = useState([]);
  const [mintPropId, setMintPropId] = useState("");
  const [loading, setLoading] = useState(false);

  const mintProperty = async () => {
    setLoading(true);
    if (!mintPropId) {
      alert("Please fill in property number first");
      setLoading(false);
      return;
    }
    console.log("Minting ", mintPropId);
    console.log("minting from address", ownerAccount);
    const tx1 = await contract.methods
      .mint(mintPropId)
      .send({ from: ownerAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
      console.log(tx1.transactionHash);
    } else {
      console.log("something went wrong");
    }
    setLoading(false);
  };

  const getAllTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSup:", totalSupply);
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenOwner = await contract.methods.ownerOf(token).call();
      if (tokenOwner === ownerAccount) {
        theTokens.push(token);
      }
    }
    setHouses(theTokens);
  };

  useEffect(() => {
    getAllTokens();
  }, [loading]);

  return (
    <div className="container">
      <span className="title_address">Account Owner: {ownerAccount}</span>
      {loading ? (
        <p>Minting...</p>
      ) : (
        <form>
          <input
            type="number"
            placeholder="Property Id - numbers only"
            id="mintInput"
            onChange={(event) => setMintPropId(event.target.value)}
          ></input>
          <button type="button" onClick={mintProperty}>
            Mint new Property
          </button>
        </form>
      )}

      <div className="tokenContainer">
        {houses.length != 0 ? (
          houses.map((pr, key) => {
            return (
              <OwnerPropView
                tokenId={pr}
                key={key}
                contract={contract}
                web3={web3}
              />
            );
          })
        ) : (
          <p>You have no tokens</p>
        )}
      </div>
    </div>
  );
};

export default Owner;
