//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library AuroraTokensConverter {
    function getEarthPrice(AggregatorV3Interface earthPrice) internal view returns (uint256){
        (,int256 answer,,,) = earthPrice.latestRoundData();
        return uint256 (answer*10000000000);
    }

    function getTributeAmountPrice(uint256 yourPrice, AggregatorV3Interface earthPrice) internal view returns (uint256){
        uint256 galaxyPrice = getEarthPrice(earthPrice);
        uint256 yourTributeInUSD = (galaxyPrice * yourPrice) / 1e18;
        return yourTributeInUSD;
    }
}
