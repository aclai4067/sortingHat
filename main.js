const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

const hpHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const hogwartsCardArr = [
    {
        name: '',
        house: '',
        seqId: ''
    }
];
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

const printCard = (cardArr) => {   
    let randomNum = Math.floor(Math.random() * 4);
    let studentInput = document.getElementById('inputPassword2').value;
    for (let i = 0; i < cardArr.length; i++) {
        let cardObj = cardArr[i];
        cardObj.name = `${studentInput}`;
        cardObj.house = `${hpHouses[randomNum]}`;
        cardObj.seqId = `expell${counter}`;
        createCard += `
            <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                    <h3 class="card-title">${cardObj.name}</h3>
                    <p class="card-text ${cardObj.house}">${cardObj.house}</p>
                    <button type="button" id="${cardObj.seqId}" class="btn btn-outline-dark expell">Expell</button>
                </div>
            </div>
        `
    };
    printToDom('cardDiv', createCard);
    for (let n = 0; n <= counter; n++) {
        document.getElementById(`expell${n}`).addEventListener('click', buttonClick);
    };
    counter++
    document.getElementById('inputPassword2').value = '';
};

const buttonClick = (e) => {
    const selectedBtn = e.target.id;
    if (selectedBtn === 'jumbotronBtn') {
        createForm();
        document.getElementById('sortButton').addEventListener('click', buttonClick);
    } else if (selectedBtn === 'sortButton') {
        printCard(hogwartsCardArr);
        // document.querySelectorAll('#cardDiv button').addEventListener('click', buttonClick);
    } else {
        console.log(selectedBtn);
        document.getElementById(selectedBtn).parentElement.parentElement.classList.add('bg-dark', 'text-white'); //add class 'bg-dark text-white'
    }
    
};

document.getElementById('jumbotronBtn').addEventListener('click', buttonClick);

