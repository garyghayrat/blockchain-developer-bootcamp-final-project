//const { default: Web3 } = require("web3");
//mc is MyContract

console.log("Hello world");

const mcAddress = '0x6797d81D1B75Cc6814c8B27a754e4D44f9377278';

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
    "name": "ads",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "adCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "expires",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "url",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "sold",
        "type": "bool"
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
        "internalType": "uint256",
        "name": "_expires",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_url",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "adID",
        "type": "uint256"
      }
    ],
    "name": "showAdUrl",
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
        "name": "newPrice",
        "type": "uint256"
      }
    ],
    "name": "changePrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "adID",
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



//For rinkeby use line below
//var web3 = new Web3(window.ethereum);

//Use this for local node
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const mc = new web3.eth.Contract(mcABI, mcAddress);

let adIndex = 0;
//mc.setProvider(window.ethereum);
console.log("index is " + adIndex);

refresh();

window.addEventListener('load', () => {
    if(typeof window.ethereum !== 'undefined') {
        let mmDetected = document.getElementById('mm-detected');
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
  //console.log(mc.methods.spots().call());
    showAds.onclick = async() => {
    //   for(let i = 0; i < 3; i++) {
    // let ad = document.getElementById("ad" + i);
    // let adString = await mc.methods.showAd(i).call();
    // ad.innerHTML = adString;
    // console.log("ad " + i + " is " + adString);
    //   };
      refresh();
    };

//Refresh the number of avaialble ad spots and show existing ads
async function refresh(){
//Showing the # of avaialble spots
document.getElementById("availability").innerHTML = "Available number of spots: " + (3 - adIndex);

//Show price in ETH
let price = await mc.methods.getPrice().call();
let ethprice = web3.utils.fromWei(price, 'ether');
document.getElementById("daily-rate").innerHTML =  "Current rate is " + ethprice + "ether/day";

//Show existing ad spots
for(let i = 0; i < 3; i++) {
 // const showAds = document.getElementById("show-ad-button");
  let ad = document.getElementById("ad" + i);
  let adString = await mc.methods.showAd(i).call();
  let adURL = await mc.methods.showAdUrl(i).call(); //trying to figure out how to access an object without creating a function in smart contract
  ad.innerHTML = adString;
  ad.onclick = () => window.open(adURL);
  ad.target = "_blank";
  console.log("ad " + i + " is " + adString + " url is " + adURL);
    };
};

//Closing an ad position
const closeAd = document.getElementById("clsoe-ad-button");

    //Reset adIndex to 0;
const resetAds = document.getElementById("reset-ad-button");

    resetAds.onclick = async() => {
      adIndex = 0;
      console.log("you may now change ad messages from index 0");
    };

    //Buy ad spot 0 with custom message
const mcBuy = document.getElementById("mc-buy-button");

const List = document.querySelector("#list");
    //Buying an ad spot
mcBuy.onclick = async() => {
 // event.preventDefault();

  //List DIV
  const listDiv = document.createElement('div');
  listDiv.classList.add("list");
  //Create LI
  const newItem = document.createElement('li');
  newItem.innerText = 'this should be working';
  newItem.classList.add('list-item');

  listDiv.appendChild(newItem);

  //Delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = "Delete";
  deleteButton.classList.add('delete-btn');
  listDiv.appendChild(deleteButton);

  //Append to list 
  List.appendChild(listDiv);

//adding a new item to the list

  // let li = document.createElement("li");
//    console.log(document.getElementById("mc-input-box").value);
  let mcString = document.getElementById("mc-input-box").value;
  let mcURL = document.getElementById("mc-url-box").value;
  let mcDays = document.getElementById("mc-days-box").value;
//    console.log(mcString);
  // let t = document.createTextNode(mcString);
  // li.appendChild(t);

  const mcPrice = await mc.methods.getPrice().call();
//    console.log("Price is" + mcPrice);
    
    
  await mc.methods.buyAd(adIndex, mcDays, mcString, mcURL).send({from: ethereum.selectedAddress, value: mcPrice*mcDays});
  adIndex ++;
  refresh();

//    window.location.reload(true);
};

