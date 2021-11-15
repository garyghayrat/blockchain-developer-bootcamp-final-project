const MyContract = artifacts.require("./MyContract.sol");

contract("MyContract", accounts => {
    it("contract should be deployed", async () => {
      await MyContract.deployed();
      return assert.isTrue(true);
    });

    it("deployer should be the owner", async() => {
      const mcInstance = await MyContract.new();
      var owner = await mcInstance.owner();
      //console.log("owner is: " + owner);
      var deployer = accounts[0]; 
      //console.log("deployer is: " + deployer);
      assert.equal(owner, deployer, "deployer is not the owner");
    })

    it("able to register a message onto adSpace", async() => {
      const mcInstance = await MyContract.new({from : accounts[0]});
      const price = await mcInstance.getPrice();
      await mcInstance.buyAd(0, "test message", {value: String(price)});
      
      const message = await mcInstance.showAd(0);
      //console.log(message);
      assert.equal(message, "test message");
    });

    it("able to register the buyer of adSpace", async() => {
      const mcInstance = await MyContract.new({from : accounts[0]});
      const price = await mcInstance.getPrice();
      //console.log(price);
      await mcInstance.buyAd(0, "test message", {value: String(price)});
      const buyer = await mcInstance.getBuyer(0);
      assert.equal(buyer, accounts[0]);
      
    });

    it("only owner should be able to withdraw", async() => {
      try {
        const mcInstance = await MyContract.new({from : accounts[0]});
        await mcInstance.withdrawAll({from: accounts[1]});
        console.log("non-owner was able to withdraw!");
        assert(false);
    } catch(err) {
        assert(err);
        console.log("only owner can withdraw");
    }
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