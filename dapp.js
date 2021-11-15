console.log("Hello world");

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

    
}