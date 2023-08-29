// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";
import {MockV3Aggregator} from "../test/Mocks/MockV3Aggregator.sol";

contract HelperConfig is Script {
    
    // Network Configuration Variables
    struct AuroraChain{
        address earthPrice;
        }
    AuroraChain public activeAuroraChain;

    // Network Selection
    constructor(){
        if (block.chainid == 11155111){
            activeAuroraChain = getSepoliaEthConfig();
        }
        else if (block.chainid == 1){
            activeAuroraChain = getMainnetEthConfig();
        }
        else {
            activeAuroraChain = getOrCreateAnvilEthConfig();
        }
        
    }
    
    // Real Networks
    function getSepoliaEthConfig() public pure returns(AuroraChain memory){
        AuroraChain memory p_config = AuroraChain({earthPrice: 0x694AA1769357215DE4FAC081bf1f309aDC325306});
        return p_config;
    }
    function getMainnetEthConfig() public pure returns(AuroraChain memory){
        AuroraChain memory p_config = AuroraChain({earthPrice: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419});
        return p_config;
    }
    // Fake Networks      
    function getOrCreateAnvilEthConfig() public returns(AuroraChain memory){
        if (activeAuroraChain.earthPrice != address(0)){
            return activeAuroraChain;
        }
        vm.startBroadcast();
        MockV3Aggregator mock_earthPrice = new MockV3Aggregator(8,2000e8);
        vm.stopBroadcast();

        AuroraChain memory p_config = AuroraChain({earthPrice: address(mock_earthPrice)});
        return p_config;
    }

}