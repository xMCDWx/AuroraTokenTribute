import { ethers } from "./ethers-5.6.esm.min.js";

const connectButton = document.getElementById("connectButton");
const executeButton = document.getElementById("executeButton");

connectButton.addEventListener("click", connect);
executeButton.addEventListener("click", execute);

async function connect(){
    if (typeof window.ethereum !== "undefined"){
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        catch (error){
            console.error("User denied account access");
        }
        connectButton.innerHTML = "Connected";
        const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
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
        const abi = [
            {
            inputs: [{ internalType: "address", name: "earthPrice", type: "address" }],
            stateMutability: "nonpayable",
            type: "constructor",
            },
            { inputs: [], name: "NotElite", type: "error" },
            { stateMutability: "payable", type: "fallback" },
            {
            inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
            name: "citizenID",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
            },
            {
            inputs: [],
            name: "collectRiches",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
            },
            {
            inputs: [],
            name: "getEliteBaseDescription",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
            },
            {
            inputs: [],
            name: "getEliteBaseVersion",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            },
            {
            inputs: [],
            name: "payTribute",
            outputs: [],
            stateMutability: "payable",
            type: "function",
            },
            {
            inputs: [{ internalType: "address", name: "_citizenID", type: "address" }],
            name: "tributeAmountByCitizens",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
            },
            {
            inputs: [],
            name: "whoIsInCharge",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
            },
            { stateMutability: "payable", type: "receive" },
        ];
        // Provider: In this case Metamask LocalHost Data.
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // Signer: Our Address.
        const signer = provider.getSigner();
        // Contract: Use all the constants to create a contract instance.
        const contract = new ethers.Contract(contractAddress, abi, signer);
        // Execute: Call the contract.
        try {
            const address = await contract.whoIsInCharge()
            console.log(address);
        }
        catch (error){
            console.log(error);
        }
    }
    else {
        executeButton.innerHTML = "Please Install Metamask";
    }
}