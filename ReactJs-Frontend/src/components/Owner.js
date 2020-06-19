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
    const mintingAccount = accounts[0];

    console.log("minting from address", mintingAccount);
    const tx1 = await contract.methods
      .mint(mintPropId)
      .send({ from: mintingAccount, gas: 2000000 });

    if (tx1) {
      console.log(tx1);
    } else {
      console.log("something went wrong");
    }
  };

  const getAllTokens = async () => {
    const accounts = await web3.eth.getAccounts();
    const mintingAccount = accounts[0];

    let theTokens = [];
    const totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSup:", totalSupply);
    // Load Tokens
    for (var i = 0; i < totalSupply; i++) {
      const token = await contract.methods.allTokens(i).call();
      const tokenOwner = await contract.methods.ownerOf(token).call();
      if (tokenOwner === mintingAccount) {
        theTokens.push(token);
      }
    }
    setHouses(theTokens);
  };

  useEffect(() => {
    getAllTokens();
  }, []);

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
      </form>
      <hr></hr>

      <div className="tokenContainer">
        {houses.map((pr, key) => {
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
    </div>
  );
};

export default Owner;
