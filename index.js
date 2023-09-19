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
import { abi_AuroraTokenTribute } from "./abi.js";

//BUTTON CONSTANTS
const connectButton = document.getElementById("connectButton");
const executeButton = document.getElementById("executeButton");
const payButton = document.getElementById("payButton");
const collectButton = document.getElementById("collectButton");
const gameButton = document.getElementById("gameButton");
//BUTTON EVENT LISTENERS
connectButton.addEventListener("click", connect);
executeButton.addEventListener("click", execute);
payButton.addEventListener("click", pay);
collectButton.addEventListener("click", collect);
gameButton.addEventListener("click", game);

//CONTRACT CONSTANTS
const contractAddress = "0x893817970d0979b1728FADAADef9F13D33c666D1"
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const network = await provider.getNetwork();
const contract = new ethers.Contract(contractAddress, abi_AuroraTokenTribute, signer);

//ENVIRONMENTAL CONSTANTS
let connected = false;
startInactivityTimer();

//FUNCTIONS
async function connect(){
    if (connected){
        showMessage(`You already did this...!`, 5000);
        return
    }
    if (!connected && typeof window.ethereum !== "undefined"){
        try {
            const accounts = await ethereum.request({ method: "eth_accounts" });
            showMessage(`Welcome to MCDW!`, 5000);
            console.log(accounts);
            connectButton.innerHTML = "Connected";
            connected = true;
        }
        catch (error){
            console.error("User denied account access");
        }
    }
    else {
        showMessage("Please install Metamask", 5000);
    }
}

async function execute(){
    if (!connected){
        showMessage(`Please connect...!`, 5000);
        return
    }
    if (typeof window.ethereum !== "undefined"){
        if (network.chainId !== 11155111) {
            showMessage("Please connect to the Sepolia network", 5000);
            return;
        }
        try {
            const address = await contract.whoIsInCharge()
            console.log(address);
            showMessage(`Your Boss ID is: ${address}`, 10000);
        }
        catch (error){
            console.log(error);
        }
    }
    else {
        showMessage("Please install Metamask", 5000);
            return;
    }
}

async function pay(){
    if (!connected){
        showMessage(`Please connect...!`, 5000);
        return
    }
    
    if (typeof window.ethereum !== "undefined"){
        if (network.chainId !== 11155111) {
            showMessage("Please connect to the Sepolia network", 5000);
            return;
        }
        try {
            const uint256 = await contract.payTribute({value: ethers.utils.parseEther("0.1")})
            console.log("Thank you for your donation");
            showMessage("Thank you for your donation", 5000);
        }
        catch (error){
            console.log(error);
            showMessage("Cheap bastard...!", 5000);
        }
    }
    else {
        showMessage("Please install Metamask", 5000);
            return;
    }
}

async function collect(){
    if (!connected){
        showMessage(`Please connect...!`, 5000);
        return
    }
    
    if (typeof window.ethereum !== "undefined"){
        if (network.chainId !== 11155111) {
            showMessage("Please connect to the Sepolia network", 5000);
            return;
        }
        try {
            const uint256 = await contract.collectRiches()
            console.log("Glory to the Elites!");
            showMessage("Glory to the Elites!", 5000);
        }
        catch (error){
            console.log(error);
            showMessage("You're probably not an Elite", 5000);
        }
    }
    else {
        showMessage("Please install Metamask", 5000);
            return;
    }
}

function game() {
    window.location.href = "game/game.html";
  }

//MESSAGE WINDOW
function showMessage(message, duration) {
    const messageElement = document.getElementById("message");
    messageElement.innerHTML = message;
    setTimeout(() => {
        messageElement.innerHTML = "";
    }, duration);
}

//TIMER GAME
function startInactivityTimer() {
    const messages = [
      "Are you there...? Do something!",
      "Hey, wake up! Do something!",
      "Don't fall asleep on me now! Do something!",
    ];
  
    let timer;
  
    function resetTimer() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const message = messages[Math.floor(Math.random() * messages.length)];
        console.log(message);
        showMessage(message, 5000);
        resetTimer();
      }, 10000);
    }
  
    function onActivity() {
      resetTimer();
    }
  
    document.addEventListener("mousemove", onActivity);
    document.addEventListener("keydown", onActivity);
  
    resetTimer();
  }