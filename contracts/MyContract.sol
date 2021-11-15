// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
//import "hardhat/console.sol";

contract MyContract is Ownable{

//Determine how many adSpots are available;
  uint spots = 3;

//all buyers who get to close their adSpace and get a refund
  address[3] public buyers;

//all avaialble ad spaces
  mapping (uint => string) adSpaces;

//Buyer's balance
  mapping (address => uint) balances;

//Price of a single adSpace;
  uint price = 1e16; //0.1 ether
  

//Verify it's the owner who's calling the contract
  modifier verifyBuyer (uint adID, address _address) {
    require(msg.sender == buyers[adID]);
    _;
  }

//Verify buyer paid enough for the adSpace or have enough balance in their account;
  modifier verifyAmount() {
    require(msg.value >= price || balances[msg.sender] >= price);
    _;
  }

//Verify the adID exists within range
  modifier verifyExists(uint adID) {
    require (adID >= 0 && adID < spots);
    _;
  }

//Pick an adSpace # from the mapping and input a message to be displayed on the website
  function buyAd(uint adID, string memory message) public payable verifyAmount verifyExists(adID) returns(string memory) {

    buyers[adID] = msg.sender;
    adSpaces[adID] = message;
    return adSpaces[adID];
  }

  function showAd(uint adID) public view verifyExists(adID) returns(string memory) {
    return adSpaces[adID];
  }

  function getPrice() public view returns(uint) {
    return price;
  }

  function getBuyer(uint number) public view returns(address) {
    return buyers[number];
  }

//Remove an adSpace message and replace with default.
  function closeAd(uint adID) public verifyBuyer(adID, msg.sender) {
//    console.log(5);
  }

//Refund customer with the unused eth balance after closing the adSpace
  function refund() public {

  }


//Enable contract to receive money
  receive() external payable {}

//Fallback function is called when msg.data is not empty
  fallback() external payable {}

//Check money accured in the contract
  function getBalance() public view returns (uint) {
        return address(this).balance;
  }

//Withdraw money accured in the contract to owner of contract
  function withdrawAll() external onlyOwner {
    (bool sent, bytes memory data) = owner().call{value: getBalance()}("");
    require(sent, "Failed to send Ether");
  }
}
