// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract MyContract {
//all avaialble add spaces

  mapping (uint => Message) adSpaces;
  
//Pick an adSpace # from the mapping and input a message to be displayed on the website
  function buyAd(uint number, string message) public returns(bool) {
    number.message = message;
    return true;
  }

//Remove an adSpace message and replace with default.
  function closeAd(uint number) public {

  }

//Refund customer with the unused eth balance after closing the adSpace
  function refund() public {

  }

//Return the message that is located at a certain mapping location
  function get(uint number) public view returns (string) {
    return message;
  }


}
