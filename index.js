const Button = document.getElementById("playButton");
const BackButton = document.getElementById("getBackButton");
const ForwardButton = document.getElementById("getForwardButton");
const RemoveButton = document.getElementById("removeButton");
const displayPageContainer = document.getElementsByClassName("dispaly-page__container")[0];

const containerDomenButtons = document.getElementById("domenButtons");

const ClearHistoryButton = document.getElementById("clearHistoryButton");
let linksFiltered = {};

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

linksArea.onchange = () => {
filterArrayButtons();
};

BackButton.onclick = () => {
    if(!localStorage.getItem('prevIndex')) return;
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let historyLength = JSON.parse(localStorage.getItem('length'));
    let currentIndex = prevIndex - 1;
    console.log(prevIndex);
    if(!localStorage.getItem(JSON.stringify(currentIndex))) {
        linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(historyLength)));
        localStorage.setItem("prevIndex", JSON.stringify(historyLength));
        return;
    }
    linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(currentIndex)));
    localStorage.setItem("prevIndex", JSON.stringify(currentIndex));
    filterArrayButtons();
}

ForwardButton.onclick = () => {
    if(!localStorage.getItem('prevIndex')) return;
    let prevIndex = JSON.parse(localStorage.getItem('prevIndex'));
    let currentIndex = prevIndex + 1;
    console.log(prevIndex);
    if(!localStorage.getItem(JSON.stringify(currentIndex))) {
        linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(1)));
        localStorage.setItem("prevIndex", JSON.stringify(1));
        return;
    };
    linksArea.value = JSON.parse(localStorage.getItem(JSON.stringify(currentIndex)));
    localStorage.setItem("prevIndex", JSON.stringify(currentIndex));
    filterArrayButtons();
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

function filterArrayButtons() {
 linksFiltered = {};
 const linksUnparsed = linksArea.value;
 const linksArray = linksUnparsed.split('\n');

 linksArray.forEach((el) => {
    if(!(el.includes("https") && el.includes("/")) || !(el.includes("http") && el.includes("/"))) return
    let domenName = el.split("/")[2];
    if(domenName.length < 3) return;
    if(domenName.includes('.')) domenName = domenName.split('.')[0];
    if(domenName == "www" || domenName == "wwv") domenName = el.split("/")[2].split('.')[1];
    if(linksFiltered[domenName]) {
         linksFiltered[domenName].links.push(el);
    console.log(linksFiltered);
    return;
    }
    linksFiltered[domenName] = {
        name: domenName,
        links: [el]
    };
    console.log(linksFiltered);
 })
containerDomenButtons.innerHTML = '';
 Object.keys(linksFiltered).forEach((key) => {
    const button = document.createElement('button');
    const input = document.createElement('input');
    input.setAttribute("type", "range");
    input.setAttribute("min", 0);
    input.setAttribute("max", linksFiltered[key].links.length);
    const container = document.createElement('div');
    container.append(button);
    container.append(input);

    button.id = key;
    button.textContent = key;
    containerDomenButtons.append(container);
 });

 console.log(containerDomenButtons.childNodes);
 containerDomenButtons.childNodes.forEach((el) => {
    const button = el.getElementsByTagName("button")[0];
    button.onclick = () => {
        linksFiltered[button.id].links.forEach((link, index) => {
            if(index > el.getElementsByTagName("input")[0].value - 1) return;
            if(link.includes("https://") || link.includes("http://")){
                window.open(link, '_blank');   
            }
        });
    }
    el.onmouseover = () => {
        const page = document.createElement("iframe");
        const linkNumber = document.createElement("div");
        linkNumber.id = "linkNumber";
        linkNumber.textContent = "#" + el.getElementsByTagName("input")[0].value;
        let link = linksFiltered[button.id].links[el.getElementsByTagName("input")[0].value - 1];
        if(link.includes("watch?v")) link = link.replace("watch?v", "embed/");
        displayPageContainer.append(page);
        displayPageContainer.append(linkNumber);
        page.setAttribute("src", link);
    }
    el.onmouseout = () => {
        displayPageContainer.innerHTML = '';
    }
 });

 
}