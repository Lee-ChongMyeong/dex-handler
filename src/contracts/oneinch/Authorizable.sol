// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Authorizable is Ownable {
    mapping(address => bool) public authorized;

    modifier onlyAuthorized() {
        require(authorized[msg.sender], "only authorized user can access");
        _;
    }

    function verifyAddress(address _address) internal pure {
        require(_address == address(_address), "invalid address");
    }

    function addAuthorized(address _address) public onlyOwner {
        verifyAddress(_address);
        authorized[_address] = true;
    }

    function removeAuthorized(address _address) public onlyOwner {
        verifyAddress(_address);
        authorized[_address] = false;
    }
}
