const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML += textToPrint;
};

const hpHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const hogwartsCardArr = [];
const voldermortCardArr = [];
let createCard = '';
let counter = 0;

const createForm = () => {
    const formString = `
        <form class="form-inline container">
            <div class="form-row">
                <div class="col-12">
                    <label for="staticEmail" class="sr-only">Enter First Year's Name</label>
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="Enter First Year's Name">
                </div>
                <div class="col-auto">
                    <label for="staticEmail2" class="sr-only">Student</label>
                    <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Student">
                </div>
                <div class="col-auto">
                    <label for="inputPassword2" class="sr-only">John Doe</label>
                    <input type="text" class="form-control" id="inputPassword2" placeholder="John Doe">
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


// enhancement- add house images to cards
// reinstate button
// replace house with voldermort's army?

const printCard = (cardArr) => {   
    let randomNum = Math.floor(Math.random() * 4);
    let studentInput = document.getElementById('inputPassword2').value;
        cardArr.push({name: `${studentInput}`, house: `${hpHouses[randomNum]}`, seqId: `expel${counter}`});
        // cardArr.push({house: `${hpHouses[randomNum]}`});
        // cardArr.push({seqId: `expel${counter}`});
        console.log(cardArr);
        console.log(counter);
    for (let i = 0; i < cardArr.length; i++) {
        let cardObj = cardArr[i];
        createCard = `
                <div class="card text-center" id="${cardObj.seqId}Card">
                    <div class="card-body">
                        <h3 class="card-title">${cardObj.name}</h3>
                        <p class="card-text ${cardObj.house}">${cardObj.house}</p>
                        <button type="button" id="${cardObj.seqId}" class="btn btn-outline-dark expel">Expel</button>
                    </div>
                </div>
        `
    }    
    printToDom('cardDiv', createCard);
    for (let n = 0; n <= counter; n++) {
        document.getElementById(`expel${n}`).addEventListener('click', buttonClick);
    };
    counter++
    document.getElementById('inputPassword2').value = '';
};



const changeSides = (e, currentArr, newArr) => {
    const selectedBtn = e.target.id;
    const selectedCard = document.getElementById(selectedBtn).parentElement.parentElement;
    const SelectedCardIndex = currentArr.indexOf(selectedCard);
    const selectedObj = currentArr.splice(SelectedCardIndex, 1);
    newArr.push(selectedObj[0]);
    if (selectedCard.parentElement.id === 'cardDiv') {
        // Change card to dark format and replace expell button with reinstate
        selectedCard.classList.add('bg-dark', 'text-white'); 
        document.getElementById(selectedBtn).innerHTML = 'Reinstate';
        document.getElementById(selectedBtn).classList.remove('btn-outline-dark', 'expel');
        document.getElementById(selectedBtn).classList.add('btn-outline-light', 'reinstate');
    } else {
        selectedCard.classList.remove('bg-dark', 'text-white');
        // Change card to light format and replace reinstate button with expel
        document.getElementById(selectedBtn).innerHTML = 'Expel';
        document.getElementById(selectedBtn).classList.remove('btn-outline-light', 'reinstate');
        document.getElementById(selectedBtn).classList.add('btn-outline-dark', 'expel');
    };
    // document.getElementById('cardDiv').removeChild(selectedCard)
    // document.getElementById('darkCardDiv').appendChild(selectedCard);
    
    
};

const buttonClick = (e) => {
    const selectedBtn = e.target.id;
    if (selectedBtn === 'jumbotronBtn') {
        createForm();
        document.getElementById('sortButton').addEventListener('click', buttonClick);
    } else if (selectedBtn === 'sortButton') {
        printCard(hogwartsCardArr);
        
    } else {
        console.log(selectedBtn);
        changeSides(e, hogwartsCardArr, voldermortCardArr);
        // use if/else on class to target expell v reinstate using same ID!!!
    }
    
};

document.getElementById('jumbotronBtn').addEventListener('click', buttonClick);

