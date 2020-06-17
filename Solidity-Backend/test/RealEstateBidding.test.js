const BigNumber = require("bignumber.js");
const truffleAssert = require("truffle-assertions");

const Medal = artifacts.require("./RealEstateBidding.sol");

contract("RealEstateBidding", (accounts) => {
  let contract;
  const idERC165 = "0x01ffc9a7";
  const idERC721 = "0x80ac58cd";
  const idERC721Meta = "0x5b5e139f";
  const tokenName = "RealEstateBidding";
  const tokenSymbol = "REB";
  const addressZero = "0x0000000000000000000000000000000000000000";
  const deployerAdd = accounts[0];
  const approvedAdd = accounts[1];
  const tokenRecAdd = accounts[2];
  const badAdd = accounts[8];
  const nonMinitngAdd = accounts[9];
  const tokenId_1 = 1111;
  const tokenId_2 = 2222;
  const tokenId_3 = 3333;
  const tokenId_4 = 4444;
  const eventTransfer = "Transfer";
  const eventApproval = "Approval";
  const eventApprovalForAll = "ApprovalForAll";
  const testEvent = function (obj, par1, par2, par3) {
    return obj[0] == par1 && obj[1] == par2 && obj[2] == par3;
  };

  before(() => {
    return Medal.deployed().then((contractInstance) => {
      contract = contractInstance;
    });
  });

  describe("A.deployment", async () => {
    it("1.Should deploy successfully", async () => {
      const address = contract.address;
      console.log(`\tDeployed with address of ${address}`);
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("2.Supports ERC721MetaData funcs supportsInterface", async () => {
      const erc721MetaComplied = await contract.supportsInterface.call(
        idERC721Meta
      );
      assert.equal(
        erc721MetaComplied,
        true,
        `Returned ${erc721MetaComplied} for ${idERC721Meta}`
      );
    });

    it("3.should have a name and equal to what received by constructor", async () => {
      const name = await contract.name();
      assert.equal(name, tokenName);
    });

    it("4.Should have a symbol and equal to what received by constructor", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, tokenSymbol);
    });
  });

  describe("B.ERC165 checks", async () => {
    it("1.Supports ERC165 func supportsInterface", async () => {
      const erc165Complied = await contract.supportsInterface.call(idERC165);
      assert.equal(
        erc165Complied,
        true,
        `Returned ${erc165Complied} for ${idERC165}`
      );
    });
  });

  describe("C.ERC721 checks", async () => {
    it("1.Supports ERC721 functions", async () => {
      const erc721Complied = await contract.supportsInterface.call(idERC721);
      assert.equal(
        erc721Complied,
        true,
        `Returned ${erc721Complied} for ${idERC721}`
      );
    });
  });

  describe("D.Minitng", async () => {
    it("1.Deployer should have zero balance before mint", async () => {
      const deployerBalance = await contract.balanceOf.call(deployerAdd);
      assert.equal(
        deployerBalance,
        0,
        `Returned ${deployerBalance} for balance of ${deployerAdd}`
      );
    });

    it("2.Deployer should be able to mint one token", async () => {
      const mintTx = await contract.mint(tokenId_1);
      const { logs } = mintTx;
      const Result = logs[0].args;
      assert(
        logs[0].event == eventTransfer &&
          testEvent(Result, addressZero, deployerAdd, tokenId_1),
        "Event Transfered not emitted"
      );
      const deployerBalanceAfter = await contract.balanceOf.call(deployerAdd);

      assert.equal(
        deployerBalanceAfter,
        1,
        `Returned ${deployerBalanceAfter} for balance of ${deployerAdd}`
      );
    });
  });

  describe("E.Function balanceOf tests", async () => {
    it("1.Should return right value for minted tokens", async () => {
      const mintTx1 = await contract.mint(tokenId_2);
      const mintTx2 = await contract.mint(tokenId_3);
      const mintTx3 = await contract.mint(tokenId_4);

      const deployerBalance = await contract.balanceOf.call(deployerAdd);
      assert.equal(
        deployerBalance,
        4,
        `Returned ${deployerBalance} for balance of ${deployerAdd}`
      );
    });

    it("2.Should return 0 for non-minting address", async () => {
      const nonMinitngBalance = await contract.balanceOf.call(nonMinitngAdd);
      assert.equal(
        nonMinitngBalance,
        0,
        `Returned ${nonMinitngBalance} for balance of ${nonMinitngAdd}`
      );
    });

    it("3.Should not be able to mint existent token", async () => {
      await truffleAssert.reverts(
        contract.mint(tokenId_1),
        "ERC721: token already minted."
      );
    });
  });

  describe("F.Function ownerOf tests", async () => {
    it("1.Should return right owner of minted tokens", async () => {
      const owner = await contract.ownerOf.call(tokenId_1);

      assert.equal(
        owner,
        deployerAdd,
        `Returned ${owner} for owner of ${tokenId_1}`
      );
    });

    it("2.Should not be able to query for nonexcisting token", async () => {
      await truffleAssert.reverts(
        contract.ownerOf.call(1234),
        "ERC721: owner query for nonexistent token"
      );
    });
  });

  describe("G.Function approve tests", async () => {
    it("1.Should set approved to some address", async () => {
      const approveTx = await contract.approve(approvedAdd, tokenId_1, {
        from: deployerAdd,
      });
      const setAdd = await contract.getApproved.call(tokenId_1);
      const { logs } = approveTx;
      const Result = logs[0].args;
      assert(
        logs[0].event == eventApproval &&
          testEvent(Result, deployerAdd, approvedAdd, tokenId_1),
        "Event Transfered not emitted"
      );

      assert.equal(
        approvedAdd,
        setAdd,
        `Returned ${setAdd} as approved for ${tokenId_1}`
      );
    });

    it("2.Should not be able approve if not owner", async () => {
      await truffleAssert.reverts(
        contract.approve(badAdd, tokenId_1, {
          from: badAdd,
        }),
        "ERC721: approve caller is not owner nor approved for all"
      );
    });
  });

  describe("H.Function getApproved tests", async () => {
    it("1.Should get approved info on token Id", async () => {
      const setAdd = await contract.getApproved.call(tokenId_1);

      assert.equal(
        approvedAdd,
        setAdd,
        `Returned ${setAdd} as approved for ${tokenId_1}`
      );
    });

    it("2.Should not be able query for nonexistent token ", async () => {
      await truffleAssert.reverts(
        contract.getApproved.call(1234),
        "ERC721: approved query for nonexistent token"
      );
    });
  });

  describe("I.Function setApprovalForAll  & isApprovedForAll tests", async () => {
    it("1.Should set approval for all", async () => {
      const setAppAllTx = await contract.setApprovalForAll(approvedAdd, true);
      const isAppAll = await contract.isApprovedForAll(
        deployerAdd,
        approvedAdd
      );

      const { logs } = setAppAllTx;
      const Result = logs[0].args;
      assert(
        logs[0].event == eventApprovalForAll &&
          testEvent(Result, deployerAdd, approvedAdd, true),
        "Event Transfered not emitted"
      );

      assert.equal(
        isAppAll,
        true,
        `Returned ${isAppAll} as approved for ${deployerAdd} as owner ${approvedAdd} as operator`
      );
    });

    it("2.Should not be able approve yourself", async () => {
      await truffleAssert.reverts(
        contract.setApprovalForAll.call(deployerAdd, true),
        "ERC721: approve to caller"
      );
    });
  });

  describe("J.Function transferFrom tests", async () => {
    it("1.Should transfer to other address", async () => {
      const transferTx = await contract.transferFrom(
        deployerAdd,
        tokenRecAdd,
        tokenId_4
      );
      const newOwner = await contract.ownerOf.call(tokenId_4);
      assert.equal(
        newOwner,
        tokenRecAdd,
        `Returned ${newOwner} as new owner of ${tokenId_4} `
      );
    });

    it("2.Should not be able transfer nonexistent token", async () => {
      await truffleAssert.reverts(
        contract.transferFrom(deployerAdd, tokenRecAdd, 1234),
        "ERC721: operator query for nonexistent token"
      );
    });

    it("3.Should not be able transfer not owned token", async () => {
      await truffleAssert.reverts(
        contract.transferFrom(badAdd, tokenRecAdd, tokenId_1),
        "ERC721: transfer of token that is not own."
      );
    });

    it("4.Should not be able transfer to zero address", async () => {
      await truffleAssert.reverts(
        contract.transferFrom(deployerAdd, addressZero, tokenId_1),
        "ERC721: transfer to the zero address"
      );
    });
  });

  describe("K.Function safeTransferFrom & safeTransferFrom with data tests", async () => {
    it("1.Should safetransfer to other address", async () => {
      const transferTx = await contract.safeTransferFrom(
        deployerAdd,
        tokenRecAdd,
        tokenId_3
      );
      const newOwnerT3 = await contract.ownerOf.call(tokenId_3);
      assert.equal(
        newOwnerT3,
        tokenRecAdd,
        `Returned ${newOwnerT3} as new owner of ${tokenId_3} `
      );
    });

    it("1.Should safetransfer to other address with data", async () => {
      const transferTx = await contract.safeTransferFrom(
        deployerAdd,
        tokenRecAdd,
        tokenId_2,
        "0x123456"
      );
      const newOwnerT2 = await contract.ownerOf.call(tokenId_2);
      assert.equal(
        newOwnerT2,
        tokenRecAdd,
        `Returned ${newOwnerT2} as new owner of ${tokenId_2} `
      );
    });
  });
});
