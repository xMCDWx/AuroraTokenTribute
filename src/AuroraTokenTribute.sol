//SPDX-License-Identifier: MIT
//MCDW Entertainment
pragma solidity ^0.8.18;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import {AuroraTokensConverter} from "./AuroraTokensConverter.sol";

error NotElite();

contract AuroraTokenTribute {
    // Call the Library
    using AuroraTokensConverter for uint256;
    
    // Make Getters
    mapping(address => uint256) private s_tributeAmountByCitizen;
    address[] private s_citizens;
    
    // Constant Variables
    address private immutable i_eliteInCharge;
    uint256 private constant MINIMUM_USD = 5e18;

    // AggregatorV3Interface Instance
    AggregatorV3Interface private s_earthPrice;

    // Constructor
    constructor(address earthPrice){
        i_eliteInCharge = msg.sender;
        s_earthPrice = AggregatorV3Interface(earthPrice);
    }

    // Function: FUND
    function payTribute() public payable {
        require(msg.value.getTributeAmountPrice(s_earthPrice) >= MINIMUM_USD, "You don't have enough Aurora Tokens");
        s_tributeAmountByCitizen[msg.sender] += msg.value;
        s_citizens.push(msg.sender);

    }

    // Miscellanious
    function getEliteBaseVersion() public view returns (uint256){
        return s_earthPrice.version();
    }
    function getEliteBaseDescription() public view returns (string memory){
        return s_earthPrice.description();
    }

    // Modifier
    modifier eliteInCharge {
        if (msg.sender != i_eliteInCharge) revert NotElite();
        _;
    }


    // Function: WITHDRAW (A BIT CHEAPER)
    function collectRiches() public eliteInCharge {
        uint256 citizensLength = s_citizens.length;
        for (uint256 i = 0; i < citizensLength; i++){
            address citizen = s_citizens[i];
            s_tributeAmountByCitizen[citizen] = 0; 
        }
        s_citizens = new address[](0);
        (bool callSucess,) = payable(msg.sender).call{value:address(this).balance}("");
        require(callSucess, "Call failed");
    }

    // Fallbacks & External Transactions
    fallback() external payable {
        payTribute();
    }
    receive() external payable {
        payTribute();
    }

    // Getters
    function tributeAmountByCitizens(address _citizenID) external view returns(uint256){
        return s_tributeAmountByCitizen[_citizenID];
    }
    function citizenID(uint256 _index) external view returns(address){
        return s_citizens[_index];
    } 
    function whoIsInCharge() external view returns(address){
        return i_eliteInCharge;
    }


}

