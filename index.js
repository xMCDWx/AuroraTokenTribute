import { ethers } from "./ethers-5.6.esm.min.js";
import { abi_AuroraTokenTribute } from "./abi.js";

const connectButton = document.getElementById("connectButton");
const executeButton = document.getElementById("executeButton");
const payButton = document.getElementById("payButton");
let connected = false;

connectButton.addEventListener("click", connect);
executeButton.addEventListener("click", execute);
payButton.addEventListener("click", pay);

startInactivityTimer();

async function connect(){
    
    if (connected){
        showMessage(`You already did this...!`, 5000);
        return
    }
    else if (connected === false && typeof window.ethereum !== "undefined"){
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (error){
            console.error("User denied account access");
        }
        
        connectButton.innerHTML = "Connected";
        const accounts = await ethereum.request({ method: "eth_accounts" });
        showMessage(`Welcome to MCDW!`, 5000);
        console.log(accounts);
        connected = true;
        return
    }
    else {
        connectButton.innerHTML = "Please Install Metamask";
        console.log("No ethereum browser detected");
    }
}

async function execute(){
    if (typeof window.ethereum !== "undefined"){
        // Contract Address: The address of the contract that we want to interact with.
        const contractAddress = "0x893817970d0979b1728FADAADef9F13D33c666D1"
        // ABI: The commands that the contract understands.
        // I imported the ABI in a separate file.
        // Provider: In this case Metamask LocalHost Data.
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Signer: Our Address.
        const signer = provider.getSigner();
        // Contract: Use all the constants to create a contract instance.
        const network = await provider.getNetwork();

        if (network.chainId !== 11155111) {
            showMessage("Please connect to the Sepolia network", 5000);
            return;
        }
        
        const contract = new ethers.Contract(contractAddress, abi_AuroraTokenTribute, signer);
        // Execute: Call the contract.
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
        executeButton.innerHTML = "Please Install Metamask";
    }
}

async function pay(){
    if (typeof window.ethereum !== "undefined"){
 
        const contractAddress = "0x893817970d0979b1728FADAADef9F13D33c666D1"
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const network = await provider.getNetwork();

        if (network.chainId !== 11155111) {
            showMessage("Please connect to the Sepolia network", 5000);
            return;
        }

        const contract = new ethers.Contract(contractAddress, abi_AuroraTokenTribute, signer);
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
        executeButton.innerHTML = "Please Install Metamask";
    }
}

function showMessage(message, duration) {
    const messageElement = document.getElementById("message");
    messageElement.innerHTML = message;
    setTimeout(() => {
        messageElement.innerHTML = "";
    }, duration);
}

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