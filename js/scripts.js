const start = async() =>{
    let algoValue = Number(document.querySelector(".algo-dropbox").value);
    let speedValue = Number(document.querySelector(".speed-dropbox").value);

    if (speedValue === 0){
        speedValue = 1;
    }

    if (algoValue === 0){
        alert("No Algorithm is selected!!")
        return;
    }

    let algorithm = new sortingAlgorithms(speedValue);
    if (algoValue === 1) await algorithm.BubbleSort();
};

const RenderScreen = async() =>{
    let algoValue = Number(document.querySelector(".algo-dropbox").value);
    await RenderList();
}

const RenderList = async() =>{
    let algoValue = Number(document.querySelector(".size-dropbox").value);
    await clearScreen();

    let list = await randomList(sizeValue);
    const arrayNode = document.querySelector(".array");
    console.log(arrayNode);
    console.log(list);
    for(const element of list){
        const node = document.createElement("div");
        node.className = "item";
        node.setAttribute("value", String(element));
        node.style.height = `${3.8*element}px`;
        arrayNode.appendChild(node);
    }
};

const RenderArray = async(sorted) =>{
    let sizeValue = Number(document.querySelector(".size-dropbox").value);
    await clearScreen();

    let list = await randomList(sizeValue);
    if (sorted) list.sort((a,b) => a-b);

    const arrayNode = document.querySelector(".array");
    const divnode = document.createElement("div");
    divnode.className = "sub-array";

    for (const element of list){
        const dnode = document.createElement("div");
        dnode.className = "sub-item";
        dnode.innerText = element;
        divnode.appendChild(dnode);
    }
    arrayNode.appendChild(divnode);
};

const randomList = async(Length) =>{
    let list = new Array();
    let lower = 1;
    let upper = 100;

    for (let c = 0; c< Length; ++c){
        let randomNum = Math.floor(
            Math.random() * (upper - lower + 1) + lower
        );
        list.push(parseInt(randomNum));
    }
    return list;
};

const clearScreen = async() =>{
    document.querySelector(".array"),innerHTML = "";
};

const response = () =>{
    let Heading = document.querySelector(".heading");
    if (Heading.className === "Heading"){
        Heading.className += "responsive";
    }
    else{
        Heading.className = "Heading";
    }
};

document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-dropbox").addEventListener("change", RenderScreen);
document.querySelector(".algo-dropbox").addEventListener("change", RenderScreen);
window.onload = RenderScreen;