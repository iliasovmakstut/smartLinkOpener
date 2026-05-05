const Button = document.getElementById("playButton");
const linksArea = document.getElementById("linksArea");
Button.onclick = () => {
    
    // window.open("https://cash-calc.org", '_blank');  
    // window.open("https://youtube.com", '_blank');   

    console.log(linksArea.value);
    const linksUnparsed = linksArea.value;
    const linksArray = linksUnparsed.split('\n');
    for(link of linksArray){
        if(link.includes("https://") || link.includes("http://")){
           window.open(link, '_blank');   
        }
    }
}

linksArea.addEventListener('paste', (event)=>{
    if(linksArea.value.length < 1) return;
    let finalText = linksArea.value + '\n';
    console.log(finalText);
    linksArea.value = '';
    linksArea.value = finalText;

    linksArea.setSelectionRange(finalText.length, finalText.length);

})