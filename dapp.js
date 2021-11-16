//const { default: Web3 } = require("web3");
//mc is MyContract
console.log("Hello world");

const mcAddress = '0x63701493584B7A6908fed4d8C19749c2D8622422';

const mcABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "stateMutability": "payable",
          "type": "fallback",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "buyers",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "adID",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "message",
              "type": "string"
            }
          ],
          "name": "buyAd",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "adID",
              "type": "uint256"
            }
          ],
          "name": "showAd",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "getPrice",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "number",
              "type": "uint256"
            }
          ],
          "name": "getBuyer",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "adID",
              "type": "uint256"
            }
          ],
          "name": "closeAd",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "refund",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "withdrawAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];

var web3 = new Web3(window.ethereum);

const mc = new web3.eth.Contract(mcABI, mcAddress);

//mc.setProvider(window.ethereum);

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

    //Connecting to Metamask
mmEnable.onclick = async() => {
    await ethereum.request({ method: 'eth_requestAccounts'});

    const mmCurrentAccount = document.getElementById("mm-current-account");

    mmCurrentAccount.innerHTML = "Here's your current account " + ethereum.selectedAddress;
};

    //Show all ads
    //Load existing ads
const showAds = document.getElementById("show-ad-button");
    showAds.onclick = async() => {
    const ad0 = document.getElementById("ad0");
    const ad0String = await mc.methods.showAd(0).call();
    ad0.innerHTML = ad0String;
    console.log("ad0 is " + ad0);
    };

    //Buy ad spot 0 with custom message
const mcBuy = document.getElementById("mc-buy-button");

mcBuy.onclick = async() => {
    const mcString = document.getElementById("mc-input-box").value;
    console.log(mcString);

    const mcPrice = await mc.methods.getPrice().call();
    console.log("Price is" + mcPrice);

    await mc.methods.buyAd(0, mcString).send({from: ethereum.selectedAddress, value: mcPrice});

    window.location.reload(true);
};

