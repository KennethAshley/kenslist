pragma solidity ^0.4.4;

contract Sale {
  address public seller;
  address public buyer;
  uint public value;
  string public name;

  modifier onlySeller() {
    if (msg.sender == seller)
    _;
  }

  modifier onlyBuyer() {
    if (msg.sender == buyer)
    _;
  }

  function Sale(string _name) payable public {
    seller = msg.sender;
    value = msg.value;
    name = _name;
  }

  function willBuy() public {
    buyer = msg.sender;
  }
}