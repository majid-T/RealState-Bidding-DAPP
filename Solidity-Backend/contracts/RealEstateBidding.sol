//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./ERC721.sol";

contract RealEstateBidding is ERC721 {
    // struct for each bid
    struct Bid {
        uint256 bidAmount;
        address bidder;
    }
    //Struct for each bid process
    struct SingleBidProcess {
        address realtor;
        bool onMarket;
        Bid highestBid;
        Bid[] allBids;
        bool winnerRevealed;
    }

    //mapping from token Ids to bid process
    mapping(uint256 => SingleBidProcess) private allBids;

    constructor() public ERC721("RealEstateBidding", "REB") {}

    function mint(uint256 propID) public {
        _mint(msg.sender, propID);
    }

    //Function to assign a realtor by owner
    function assignRealtor(uint256 tokenId, address realtor) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "RealStatebidding: Can not assign for others token"
        );

        require(
            ownerOf(tokenId) != address(0),
            "RealStatebidding: No such token"
        );

        allBids[tokenId] = SingleBidProcess(
            realtor,
            false,
            Bid(0, address(0)),
            new Bid[](0),
            false
        );
    }

    //function to place realstate on market by realtor
    function putOnMarket(uint256 tokenId) public {
        //check if token exists
        //check if sender is the assigned realtor
        //change on market to true on bidProcess struct
        // Fire event on market
    }

    //biding on properties
    function bid(uint256 tokenId, uint256 amount) public {
        //check if tokenId is still on market
        //check if amount is higher than highest bid
        //replace highest bid with new bid
        //push bid to array bids
        //Fire new high bid
    }

    // Reveal winner function
    //TBD other functions
}
