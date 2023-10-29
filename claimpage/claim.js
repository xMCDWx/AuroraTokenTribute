/////////////////////////////////////////////////////////////
//   _____ ______   ________  ________  ___       __       //
// |\   _ \  _   \|\   ____\|\   ___ \|\  \     |\  \      //
// \ \  \\\__\ \  \ \  \___|\ \  \_|\ \ \  \    \ \  \     //
//  \ \  \\|__| \  \ \  \    \ \  \ \\ \ \  \  __\ \  \    //
//   \ \  \    \ \  \ \  \____\ \  \_\\ \ \  \|\__\_\  \   //
//    \ \__\    \ \__\ \_______\ \_______\ \____________\  //
//     \|__|     \|__|\|_______|\|_______|\|____________|  //
//                                                         //
/////////////////////////////////////////////////////////////                                                   
                                                      
//IMPORTS
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi_ProjectLucifer } from "./abi.js";

//BUTTON CONSTANTS
const connectButton = document.getElementById("connectButton");
const claimButton = document.getElementById("claimButton");

//BUTTON EVENT LISTENERS
connectButton.addEventListener("click", connect);

//ENVIRONMENTAL CONSTANTS
let connected = false;

//CONTRACT CONSTANTS
const contractAddress = "0x3f5492798A65bb05F9Da37516BDb17540681A3B1"
const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
const signer = provider.getSigner();
const network = await provider.getNetwork();
const contract = new ethers.Contract(contractAddress, abi_ProjectLucifer, signer);

//FUNCTIONS
async function connect(){
    if (!connected && typeof window.ethereum !== "undefined"){
        try {
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(accounts);
            connectButton.innerHTML = "Connected";
            connected = true;
        }
        catch (error){
            console.error("User denied account access");
        }
    }
}

