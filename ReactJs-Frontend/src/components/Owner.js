import React, { Component, useState, useEffect } from "react";
import OwnerPropView from "./OwnerPropView";

const Owner = (props) => {
  const web3 = props.web3;
  const contract = props.contract;

  const [houses, setHouses] = useState([]);
  const [mintPropId, setMintPropId] = useState("");

  const mintProperty = async () => {
    console.log("Minting ", mintPropId);
    const accounts = await web3.eth.getAccounts();
    const minitingAcoount = accounts[0];

    console.log("minting from address", minitingAcoount);
    const tx1 = await contract.methods
      .mint(mintPropId)
      .send({ from: minitingAcoount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
  };

  const getAllTokens = async () => {
    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSup:", totalSupply);
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      theTokens.push(token);
    }

    console.log(theTokens);
    setHouses(theTokens);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Property Id"
          onChange={(event) => setMintPropId(event.target.value)}
        ></input>
        <button type="button" onClick={mintProperty}>
          Mint new Property
        </button>

        <button type="button" onClick={getAllTokens}>
          loadMy tokens
        </button>
      </form>
      <hr></hr>

      <div className="tokenContainer">
        {houses.map((pr, key) => {
          return <OwnerPropView tokenId={pr} key={key} contract={contract} />;
        })}
      </div>
    </div>
  );
};

export default Owner;
