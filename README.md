# Garyslist

## Project URL

https://garyghayrat.github.io/blockchain-developer-bootcamp-final-project/

## Project Description

Garyslist is a smart contract with a simple interface that lets anyone store texts on the blockchain. As a proof of concept project, Garyslist gives everyone easy access to Ethereum. 

## Workflow

Buying a message spot:
	
	1. Connect your Metamask wallet to the website.

	2. Change your wallet network to **Rinkeby** Test Network

	3. Input a description, a link or a message, and the number of days you would like the message to be stored for.

	4. Click the submit message button and pay for the transaction through the Metamask.

	5. Input the ID corresponding to your message and click the Retrieve Message button to see your message any time. 

## Running the project locally

### Prerequisites

- Node.js >= v14
- Truffle and Ganache
- VScode with Live Server extension

### Directory structure

- `docs`: Project's frontend
- `contracts`: Smart contracts that are deployed in the Rinkeby Test Net
- `migrations`: Migration files for deploying smart contracts.
- `test`: JS tests for the smart contracts.

### Contracts 

1. Run `npm install` to install dependencies

2. Run `ganache-cli` in a terminal, port 8545 is the default

3. Run `truffle migrate` in the root directory

4. `truffle console`

5. Run `test`

### Frontend

1. `cd docs/`
	
2. `code .`

3. Select `index.html`, right click and select Open with Live Server


## Screencast Link
https://www.youtube.com/watch?v=CqFzxU8WOVU

## Ethereum wallet address
zkGary.eth or
0x998a392431a0105a35636d5d51af8e20003f548d

