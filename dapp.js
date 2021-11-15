//const { default: Web3 } = require("web3");

console.log("Hello world");

const ssAddress = '0x5829CF0099454D641401732c0E68cEa8be7b7163';

const ssABI = [
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

window.addEventListener('load', () => {
    if(typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById(
            'mm-detected')
        mmDetected.innerHTML = "Metamask Has Been Detected";
    }

    else {
        console.log("Metamask Not Available");
        alert("You need to install Metamask");
    }
});

const mmEnable = document.getElementById("mm-connect");

mmEnable.onclick = async() => {
    await ethereum.request({ method: 'eth_requestAccounts'});

    const mmCurrentAccount = document.getElementById("mm-current-account");

    mmCurrentAccount.innerHTML = "Here's your current account " + ethereum.selectedAddress;

}


const ssGet = document.getElementById("ss-get");

    ssGet.onclick = async() => {

    var web3 = new Web3(window.ethereum);

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress);
    
    const number = await simpleStorage.methods.retrieve().call();

    const ssCurrent = document.getElementById("ss-current");

    ssCurrent.innerHTML = number;
};




const ssSubmit = document.getElementById("ss-input-button");

ssSubmit.onclick = async() => {
    const ssValue = document.getElementById("ss-input-box").value;
    console.log(ssValue);

    var web3 = new Web3(window.ethereum);

    const simpleStorage = new web3.eth.Contract(ssABI, ssAddress);

    // simpleStorage.setProvider(window.ethereum);

    await simpleStorage.methods.store(ssValue).send({from: ethereum.selectedAddress});
}



