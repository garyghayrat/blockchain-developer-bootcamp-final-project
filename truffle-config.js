const path = require("path");

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraURL = 'https://rinkeby.infura.io/v3/2f914bd107014e87b74249b8c6c2ab37'
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },

    rinkeby:  {
      provider: () => new HDWalletProvider(mnemonic, infuraURL),
      network_id: 4,          // Rinkeby's network id
      gas: 5500000,        
    },
  }

};
