/// SPDX-License-Identifier: MIT
pragma solidity =0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Garyslist
/// @author Gary Ghayrat
/// @notice Simple way to store texts on Ethereum 
/// @dev All function calls are currently implemented without side effects
contract MyContract is Ownable {

/// @dev Determine how many adSpots are available;
  uint spots = 3;
  uint AdCount = 0;

/// @dev To be implemented: all buyers who get to close their adSpace and get a refund

/// @dev All avaialble ad spaces
  mapping (uint => Ad) public ads;

/// @dev Ad specifications

  struct Ad {
    uint adCount;
    uint price;
    uint expires;
    string message;
    string url;
    address buyer;
    bool sold;
  }

/// @dev Buyer's balance, currently not used
  mapping (address => uint) balances;

/// @dev Price of a single adSpace;
  uint price = 1e13; //0.0001 ether
  

/// @dev Verify it's the owner of an ad that's trying to call the contract;
/// @param adID unique ID for each message
/// @param _address address of the owner of a message
  modifier verifyBuyer (uint adID, address _address) {
    require(_address == ads[adID].buyer);
    _;
  }

/// @dev Verify buyer paid enough for the adSpace or have enough balance in their account;
/// @param expires number of days the buyer paid to keep the message up
  modifier verifyAmount(uint adID, uint expires) {
    require(msg.value >= price*expires);
    _;
  }

/// @dev Verify the adID exists within range
  modifier verifyExists(uint adID) {
    require (adID >= 0 && adID < spots);
    _;
  }

/// @dev Pick an adSpace # from the mapping and input a message to be displayed on the website
  function buyAd(uint adID, uint _expires, string memory _message, string memory _url) public payable verifyAmount(adID, _expires) returns(string memory) {
    /// @dev Need to initialize sold status to be able to use: require (ads[adID].sold == false);

    ads[adID] = Ad({
      adCount: AdCount,
      price: price,
      expires: block.timestamp + (_expires * 1 days),
      message: _message,
      url : _url,
      buyer : msg.sender,
      sold : true
    });

    AdCount ++;

    return ads[adID].message;
  }
  
/// @dev Following functions will be completed with future updates
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

/// @dev Remove an adSpace message and replace with default.
  function closeAd(uint adID) public verifyBuyer(adID, msg.sender) {
    ads[adID].message = "";
    ads[adID].buyer = address(0);
    ads[adID].sold = false;

    refund();
  }

/// @dev Return current adCount

  function getAdCount() public view returns (uint) {
    return AdCount;
  }

/// @dev Refund customer with the unused eth balance after closing the adSpace
  function refund() public {

  }


/// @dev Enable contract to receive money
  receive() external payable {}

/// @dev Fallback function is called when msg.data is not empty
  fallback() external payable {}

/// @dev Check money accured in the contract
  function getBalance() public view returns (uint) {
        return address(this).balance;
  }

/// @dev Withdraw money accured in the contract to owner of contract
  function withdrawAll() external onlyOwner {
    (bool sent, bytes memory data) = owner().call{value: getBalance()}("");
    require(sent, "Failed to send Ether");
  }
}
