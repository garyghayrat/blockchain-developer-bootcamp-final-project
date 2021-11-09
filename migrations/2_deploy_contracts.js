const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const MyContract = artifacts.require("./MyContract.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MyContract);
};
