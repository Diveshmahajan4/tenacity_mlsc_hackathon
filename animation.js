const containerEl  = document.querySelector(".text");
const careers = ["Developer" , "Founder", "Builder" , "Innovator"  ,"Creator"];

let idx = 0 , chIdx = 0;

containerEl.innerHTML = `<h1>I am a ${careers[idx]}</h1>`

updateText();

function updateText(){
    chIdx++;
    containerEl.innerHTML = `<h1>I am a ${careers[idx].slice(0, chIdx)}</h1>`;
    
    if(chIdx === careers[idx].length){
        idx++;
        chIdx = 0;
    }

    if(idx === careers.length){
        idx = 0;
    }
    setTimeout(updateText, 500);
}