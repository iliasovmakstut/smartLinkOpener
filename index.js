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
    setTimeout(() => {
        if(linksArea.value.trim().length > 0){
            if(!linksArea.value.endsWith('\n')){
                linksArea.value += '\n';
            }
        }
        linksArea.scrollTop = linksArea.scrollHeight;
    }, 0);
})