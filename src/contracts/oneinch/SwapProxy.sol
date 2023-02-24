// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./interfaces/IERC20.sol";
import "./Authorizable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SwapProxy is Authorizable {
    address immutable router;

    constructor(address _router) {
        router = _router;
        addAuthorized(msg.sender);
    }

    function swap(
        address _srcToken,
        address _dstToken,
        address sender,
        uint256 amount,
        bytes calldata _data
    ) external onlyAuthorized {
        verifyAddress(sender);

        address proxyAddr = address(this);

        IERC20 srcToken = IERC20(_srcToken);
        IERC20 dstToken = IERC20(_dstToken);
        srcToken.transferFrom(sender, proxyAddr, amount);
        srcToken.approve(router, amount);

        (bool succ, ) = address(router).call(_data);
        require(succ, "aggregation router makes unknown error.");

        uint256 takingAmount = dstToken.balanceOf(proxyAddr);
        if (takingAmount > 0) {
            dstToken.transferFrom(proxyAddr, sender, takingAmount);
        }
    }
}
