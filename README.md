# RealState-Bidding-DAPP

Group Project for Blockchain Design Patterns

## Students

Majid Shockoohi | Aditi Sharma | Malhar Dave | Mariam Delos Reyes | Taj Sivers

### How to Deploy

1. Deploy contract on your ganache
1. Use contract address and replace it with contract address in app.js of frontend
1. npm start in frontend folder

### Goals:

To have a way for buyer and seller to be part of transparent auction of a real estate property. All owners will be able to offer their properties on the DAPP through a realtor, where all offers including price and date are visible to owners. At the moment due to lack of transparency there is the possibility of stakeholders to have side deals and others to suffer losses.

### Stakeholders:

Property owner, Realtors, Buyer, Bidders

Property owner: Will assign a realtor to their property, Will view their bid process and final result in a transparent and clear way.
Realtors: Can conduct a bid process on the DAPP.
Buyer: Will bid on a property and will be notified as winner for further actions.
Bidders: View properties on market and ,Will bid on a property and will know who the winner was and with which price.

### State Data:

Data on each property, including property uniq id, starting price, owner and realtor information, date of bid and date of bid expiry.
Data on bids, buyer, winner including date and time.

### Restrictions:

Property owner: Can not change starting price after submitted.
Realtors: Can not interfere with the process of bidding and winner declaration.
Buyer: Can not withdraw bid after submitted or view other bids.
DAPP owner: Should not be able to edit bid process data on DAPP or view bid prices.

### Exceptions:

Owner can remove the property from the market, canceling all events and processes.

## System Architecture

![architecture](/media/arch.png)

## Process Flow

![flow](/media/flow.png)

## Planing and execution

![planing](/media/plan.png)
