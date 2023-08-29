// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    AuroraChain public activeAuroraChain;

    constructor(){
        activeAuroraChain = getSepoliaEthConfig();
    }
    struct AuroraChain{
        address earthPrice;
    }
    function getSepoliaEthConfig() public pure returns(AuroraChain memory){
        AuroraChain memory sepoliaConfig = AuroraChain({earthPrice: 0x694AA1769357215DE4FAC081bf1f309aDC325306});
        return sepoliaConfig;
    }   


}