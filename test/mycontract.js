const MyContract = artifacts.require("./MyContract.sol");

contract("MyContract", accounts => {
    it("contract should be deployed", async () => {
      await MyContract.deployed();
      return assert.isTrue(true);
    });

    it("deployer should be the owner", async() => {
      const mcInstance = await MyContract.new();
      var owner = await mcInstance.owner();
      console.log("owner is: " + owner);
      var deployer = accounts[0]; 
      console.log("deployer is: " + deployer);
      assert.equal(owner, deployer, "deployer is not the owner");
    })

    it("should be able to buy an Adspace", async() => {
      const mcInstance = await MyContract.new({from : accounts[0]});
      await mcInstance.buyAd(0, "test message", {from: accounts[0], value: String(11e16)});
      const message = await mcInstance.showAd(0);
      console.log(message);
      assert.equal(message, "test message");
    });
});

/*
contract("SipmleStorage", accounts => {
  it("...should store the value 89.", async () => {
    const simpleStorageInstance = await SimpleStorage.deployed();

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await simpleStorageInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
*/