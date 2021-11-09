// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract MyContract {
//all avaialble add spaces
  mapping (uint => bytes32) adSpaces;
  
//Pick an adSpace # from the mapping and input a message to be displayed on the website
  function buyAd(uint number, bytes32 message) public returns(bool) {
    adSpaces[number] = message;
    return true;
  }

//Remove an adSpace message and replace with default.
  function closeAd(uint number) public {

  }

//Refund customer with the unused eth balance after closing the adSpace
  function refund() public {

  }

//Return the message that is located at a certain mapping location
  function get(uint number) public returns (bytes32) {
    return adSpaces[number];
  }


}
