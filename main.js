const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const hpHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const hpCrests = ['https://webstockreview.net/images/houses-clipart-harry-potter-13.png', 'https://www.nicepng.com/png/full/43-439104_hufflepuff-crest-harry-potter-banner-harry-potter-hufflepuff.png', 'https://www.fourjay.org/myphoto/f/37/372749_ravenclaw-crest-png.png', 'https://cdn.shopify.com/s/files/1/1325/3287/products/HP8040B_dc8bf299-48e5-481c-829a-c0548d3c12b8.png?v=1546231184']
const hogwartsCardArr = [];
const voldermortCardArr = [];
let counter = 0;

const createForm = () => {
    const formString = `
        <form class="form-inline container">
            <div class="form-row">
                <div class="col-12">
                    <label for="staticEmail" class="sr-only">Enter First Year's Name</label>
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Enter First Year's Name">
                </div>
                <div class="col-auto shiftForm">
                    <label for="staticEmail2" class="sr-only">Student</label>
                    <input type="text" readonly class="form-control-plaintext text-center" id="staticEmail2" value="Student:">
                </div>
                <div class="col-auto">
                    <label for="inputPassword2" class="sr-only">John Doe</label>
                    <input type="text" class="form-control" id="inputPassword2" placeholder="John Doe" Required>
                </div>
                <div class="col-auto">
                    <button type="button" id="sortButton" class="btn btn-outline-success mb-2">Sort!</button>
                </div>
            </div>
        </form>
    `;
    printToDom('formDiv', formString);
    document.getElementById('jumbotronBtn').style.display = "none";
    
};

const newObject = (cardArr) => {
    let randomNum = Math.floor(Math.random() * 4);
    let studentInput = document.getElementById('inputPassword2').value;
    cardArr.push({name: `${studentInput}`, house: `${hpHouses[randomNum]}`, crest: `${hpCrests[randomNum]}`, seqId: `expel${counter}`});
};



const printCard = (cardArr) => {   
    let createCard = '';
    if (cardArr === hogwartsCardArr) {
        for (let i = 0; i < cardArr.length; i++) {
            let cardObj = cardArr[i];
            createCard += `
                    <div class="card text-center text-white ${cardObj.house}" id="${cardObj.seqId}Card">
                        <div class="card-body">
                            <img class="card-img houseCrest" src="${cardObj.crest}" alt="${cardObj.house} crest" />
                            <h3 class="card-title">${cardObj.name}</h3>
                            <p class="card-text">${cardObj.house}</p>
                            <button type="button" id="${cardObj.seqId}" class="btn btn-outline-light expel">Expel</button>
                        </div>
                    </div>
            `
        } ;
        printToDom('cardDiv', createCard);
    } else {  
        for (let i = 0; i < cardArr.length; i++) {
            let cardObj = cardArr[i];
            createCard += `
                    <div class="card text-center bg-dark text-white ${cardObj.house}" id="${cardObj.seqId}Card">
                        <div class="card-body">
                        <img class="card-img darkmark" src="https://i.ebayimg.com/images/g/amAAAOSwvApaNh7i/s-l300.jpg" alt="dark mark" />
                            <h3 class="card-title">${cardObj.name}</h3>
                            <p class="card-text">Voldemort's Army</p>
                            <button type="button" id="${cardObj.seqId}" class="btn btn-outline-light reinstate">Reinstate</button>
                        </div>
                    </div>
            `
        } ;
        printToDom('darkCardDiv', createCard);
    };
    for (let n = 0; n <= counter; n++) {
        const targtButton = document.getElementById(`expel${n}`);
        if (targtButton){
            targtButton.addEventListener('click', buttonClick);
        };
    };
    document.getElementById('inputPassword2').value = '';
};


const changeSides = (e, currentArr, newArr) => {
    const selectedBtn = e.target.id;
    const SelectedCardIndex = currentArr.findIndex(obj => obj.seqId === selectedBtn);
    const selectedObj = currentArr.splice(SelectedCardIndex, 1);
    newArr.push(selectedObj[0]);
};

const orderByHouse = () => {hogwartsCardArr.sort((first, last) => {
    if (first.house > last.house) {
        return 1
    } else {
        return -1
    }

}
);};

const buttonClick = (e) => {
    const selectedBtn = e.target.id;
    const selectedCardParentDiv = document.getElementById(selectedBtn).parentElement.parentElement.parentElement;
    if (selectedBtn === 'jumbotronBtn') {
        createForm();
        document.getElementById('sortButton').addEventListener('click', buttonClick);
    } else if (selectedBtn === 'sortButton') {
        if (document.getElementById('inputPassword2').value){
            newObject(hogwartsCardArr);
            orderByHouse();
            printCard(hogwartsCardArr);  
            counter++;
        } else {
            alert('Please enter a name!');
        }
    } else {
        if (selectedCardParentDiv.id === 'cardDiv') {
            changeSides(e, hogwartsCardArr, voldermortCardArr);
        } else {
            changeSides(e, voldermortCardArr, hogwartsCardArr);
        }
        orderByHouse();
        printCard(hogwartsCardArr);
        printCard(voldermortCardArr);
    };
    
};

document.getElementById('jumbotronBtn').addEventListener('click', buttonClick);

