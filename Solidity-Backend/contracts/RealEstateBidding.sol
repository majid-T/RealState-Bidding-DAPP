//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./ERC721.sol";

contract RealEstateBidding is ERC721 {
    // struct for each bid
    struct Bid {
        address bidAddress;
        uint256 bidAmount;
    }

    //Struct for each bid process
    struct SingleBidProcess {
        address realtor;
        bool onMarket;
        Bid highestBid;
        bool winnerRevealed;
        address winner;
    }

    //holds all tokens minted
    uint256[] public allTokens;
    //tokens On market  list to iterate
    uint256[] public market;

    //tokens on market mapping for uinqe access
    mapping(uint256 => bool) inMarket;

    //mapping from token Ids to bid process
    mapping(uint256 => SingleBidProcess) allBids;

    //-- Events ---
    event PropOnMarket(uint256 indexed tokenId, address indexed realtor);
    event HighBid(uint256 indexed tokenId, address indexed bidder);
    event WinnerRevealed(
        uint256 indexed tokenId,
        address indexed winner,
        uint256 indexed price
    );
    event PropOnWithdraw(uint256 indexed tokenId);

    constructor() public ERC721("RealEstateBidding", "REB") {}

    function mint(uint256 propID) public {
        _mint(msg.sender, propID);
        allTokens.push(propID);
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
            Bid(address(0), 0),
            false,
            address(0)
        );
    }

    //function to place realstate on market by realtor
    function putOnMarket(uint256 tokenId) public {
        //check if token exists
        //check if sender is the assigned realtor
        require(
            msg.sender == allBids[tokenId].realtor,
            "RealStatebidding: Only assigned realtor can call this function."
        );
        //change on market to true on bidProcess struct
        allBids[tokenId].onMarket = true;
        if (!inMarket[tokenId]) {
            inMarket[tokenId] = true;
            market.push(tokenId);
        }
        // Fire event on market
        emit PropOnMarket(tokenId, msg.sender);
    }

    //biding on properties
    function bid(uint256 tokenId, uint256 amount) public {
        //check if tokenId is still on market
        require(
            allBids[tokenId].onMarket,
            "RealStatebidding:Property is no longer on Market"
        );
        //check if amount is higher than highest bid
        require(
            allBids[tokenId].highestBid.bidAmount < amount,
            "RealStatebidding:There is already a highest bid on this property"
        );
        //replace highest bid with new bid
        allBids[tokenId].highestBid = Bid(msg.sender, amount);
        //push bid to array bids
        //Fire new high bid
        emit HighBid(tokenId, msg.sender);
    }

    // Reveal winner function
    function revealWinner(uint256 tokenId) public returns (address) {
        // Check is caller the realtor
        require(
            msg.sender == allBids[tokenId].realtor,
            "RealStatebidding: Only assigned realtor can call this function."
        );

        // check if there is a bid on property
        if (allBids[tokenId].highestBid.bidAmount == 0) {
            return address(0);
        } else {
            allBids[tokenId].onMarket = false;
            allBids[tokenId].winnerRevealed = true;
            allBids[tokenId].winner = allBids[tokenId].highestBid.bidAddress;
            emit WinnerRevealed(
                tokenId,
                allBids[tokenId].winner,
                allBids[tokenId].highestBid.bidAmount
            );
            return allBids[tokenId].winner;
        }
    }

    // function view Bids on my property
    function getHighestBid(uint256 tokenId) public view returns (uint256) {
        return allBids[tokenId].highestBid.bidAmount;
    }

    // function get market size
    function getMarketSize() public view returns (uint256) {
        //Can only view bids On my property
        return market.length;
    }

    // function to withdraw property from market
    function withdrawFromMarket(uint256 tokenId) public returns (bool) {
        //Can only wwithdraw for my property
        require(
            ownerOf(tokenId) == msg.sender,
            "RealStatebidding: Can not withdraw others token"
        );

        allBids[tokenId].onMarket = false;
        allBids[tokenId].realtor = address(0);
        allBids[tokenId].highestBid = Bid(address(0), 0);

        //Fire event property withdraw from market
        emit PropOnWithdraw(tokenId);

        return true;
    }

    // Getting single bid
    function getBidProcess(uint256 tokenId)
        public
        view
        returns (
            address,
            bool,
            address,
            uint256,
            bool,
            address
        )
    {
        //check if tokenId is still on market
        // require(
        //     allBids[tokenId].onMarket,
        //     "RealStatebidding:Property is no longer on Market"
        // );
        return (
            allBids[tokenId].realtor,
            allBids[tokenId].onMarket,
            allBids[tokenId].highestBid.bidAddress,
            allBids[tokenId].highestBid.bidAmount,
            allBids[tokenId].winnerRevealed,
            allBids[tokenId].winner
        );
    }
}
