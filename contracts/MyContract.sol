// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
//import "hardhat/console.sol";

contract MyContract is Ownable{

//Determine how many adSpots are available;
  uint spots = 3;
  uint adCount = 0;

//all buyers who get to close their adSpace and get a refund
//  address[3] public buyers;

//all avaialble ad spaces
  mapping (uint => Ad) public ads;

//Ad specifications

  struct Ad {
    uint adCount;
    uint price;
    uint expires;
    string message;
    string url;
    address buyer;
    bool sold;
  }

//Buyer's balance
  mapping (address => uint) balances;

//Price of a single adSpace;
  uint price = 1e13; //0.0001 ether
  

//Verify it's the owner of an ad that's trying to call the contract;
  modifier verifyBuyer (uint adID, address _address) {
    require(_address == ads[adID].buyer);
    _;
  }

//Verify buyer paid enough for the adSpace or have enough balance in their account;
  modifier verifyAmount(uint adID, uint expires) {
    require(msg.value >= price*expires);
    _;
  }

//Verify the adID exists within range
  modifier verifyExists(uint adID) {
    require (adID >= 0 && adID < spots);
    _;
  }

//Pick an adSpace # from the mapping and input a message to be displayed on the website
  function buyAd(uint adID, uint _expires, string memory _message, string memory _url) public payable verifyAmount(adID, _expires) verifyExists(adID) returns(string memory) {
    require (ads[adID].sold == false);

    ads[adID] = Ad({
      adCount: adCount,
      price: price,
      expires: block.timestamp + (_expires * 1 days),
      message: _message,
      url : _url,
      buyer : msg.sender,
      sold : true
    });

    return ads[adID].message;
  }
  
  function showAd(uint adID) public view returns(string memory) {
    return ads[adID].message;
  }

  function showAdUrl(uint adID) public view returns(string memory) {
    return ads[adID].url;
  }
  
  function getPrice() public view returns(uint) {
    return price;
  }

  function changePrice(uint newPrice) external onlyOwner {
    price = newPrice;
  }

  function getBuyer(uint adID) public view returns(address) {
    return ads[adID].buyer;
  }

//Remove an adSpace message and replace with default.
  function closeAd(uint adID) public verifyBuyer(adID, msg.sender) {
    ads[adID].message = "";
    ads[adID].buyer = address(0);
    ads[adID].sold = false;

    refund();
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
