//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {AuroraTokenTribute} from "../src/AuroraTokenTribute.sol";
import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";


contract DeployAuroraTokenTribute is Script {
    
    function run() external returns(AuroraTokenTribute){
        HelperConfig helperConfig = new HelperConfig();
        address officialAuroraChain = helperConfig.activeAuroraChain();

        vm.startBroadcast();
        AuroraTokenTribute auroraTokenTribute = new AuroraTokenTribute(officialAuroraChain);
        vm.stopBroadcast();
        return auroraTokenTribute;

    }
}


