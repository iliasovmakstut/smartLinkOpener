const Button = document.getElementById("playButton");
const BackButton = document.getElementById("getBackButton");
const ForwardButton = document.getElementById("getForwardButton");
const RemoveButton = document.getElementById("removeButton");

const ClearHistoryButton = document.getElementById("clearHistoryButton");


const linksArea = document.getElementById("linksArea");
if(!localStorage.getItem('prevIndex')) localStorage.setItem('prevIndex', "0");
if(!localStorage.getItem('length')) localStorage.setItem('length', "0");

if(localStorage.getItem(localStorage.getItem('prevIndex'))) linksArea.value = JSON.parse(localStorage.getItem(localStorage.getItem('prevIndex')));
    

Button.onclick = () => {
    if(!localStorage.getItem('prevIndex')) localStorage.setItem('prevIndex', "0");
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let historyLength = JSON.parse(localStorage.getItem('length'));
    // window.open("https://cash-calc.org", '_blank');  
    // window.open("https://youtube.com", '_blank');   

    const linksUnparsed = linksArea.value;
    const linksArray = linksUnparsed.split('\n');
    for(link of linksArray){
        if(link.includes("https://") || link.includes("http://")){
           window.open(link, '_blank');   
        }
    }
    historyLength++;
    localStorage.setItem('length', historyLength);
    localStorage.setItem("prevIndex", JSON.stringify(prevIndex + 1));
    localStorage.setItem(JSON.stringify(prevIndex + 1), JSON.stringify(linksUnparsed));
}

BackButton.onclick = () => {
    if(!localStorage.getItem('prevIndex')) return;
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let currentIndex = prevIndex - 1;
    console.log(prevIndex);
    if(!localStorage.getItem(JSON.stringify(currentIndex)))
        return;
    linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(currentIndex)));
    localStorage.setItem("prevIndex", JSON.stringify(currentIndex));
}

ForwardButton.onclick = () => {
    if(!localStorage.getItem('prevIndex')) return;
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let currentIndex = prevIndex + 1;
    console.log(prevIndex);
    if(!localStorage.getItem(JSON.stringify(currentIndex))) return;
    linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(currentIndex)));
    localStorage.setItem("prevIndex", JSON.stringify(currentIndex));
}

RemoveButton.onclick = () => {
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let getData = JSON.parse(localStorage.getItem(prevIndex - 1));
    linksArea.value = getData;
    let historyLength = JSON.parse(localStorage.getItem('length'));

    localStorage.removeItem(prevIndex);
    for(let i = prevIndex; historyLength > i; i++){
        let dataHolder = localStorage.getItem(i + 1);
        localStorage.setItem(i, dataHolder);
    }
    localStorage.setItem("length", historyLength - 1);
    localStorage.setItem("prevIndex", prevIndex-1);
}

ClearHistoryButton.onclick = () => {
    localStorage.clear();
}


linksArea.addEventListener('paste', (event)=>{
    setTimeout(() => {
        if(linksArea.value.trim().length > 0){
            if(!linksArea.value.endsWith('\n')){
                linksArea.value += '\n';
            }
        }
        linksArea.scrollTop = linksArea.scrollHeight;
    }, 0);
})