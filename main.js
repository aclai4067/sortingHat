const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML += textToPrint;
};

const hpHouses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
// const hogwartsCardArr = [
//     {
//         name: '',
//         house: '',
//         seqId: ''
//     }
// ];
// const voldermortCardArr = [];
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
// add voldermort house?

const printCard = () => {   
    let randomNum = Math.floor(Math.random() * 4);
    let studentInput = document.getElementById('inputPassword2').value;
        createCard = `
                <div class="card text-center" id="$expell${counter}Card">
                    <div class="card-body">
                        <h3 class="card-title">${studentInput}</h3>
                        <p class="card-text ${hpHouses[randomNum]}">${hpHouses[randomNum]}</p>
                        <button type="button" id="expell${counter}" class="btn btn-outline-dark expell">Expell</button>
                    </div>
                </div>
        `
    printToDom('cardDiv', createCard);
    for (let n = 0; n <= counter; n++) {
        document.getElementById(`expell${n}`).addEventListener('click', buttonClick);
    };
    counter++
    document.getElementById('inputPassword2').value = '';
};

const convertToVoldermortsArmy = (e) => {
    const selectedBtn = e.target.id;
    const darkCard = document.getElementById(selectedBtn).parentElement.parentElement;
    darkCard.classList.add('bg-dark', 'text-white'); //add class 'bg-dark text-white'
    document.getElementById('cardDiv').removeChild(darkCard)
    document.getElementById('darkCardDiv').appendChild(darkCard);
    document.getElementById(selectedBtn).innerHTML = 'Reinstate';
    document.getElementById(selectedBtn).classList.remove('btn-outline-dark', 'expell');
    document.getElementById(selectedBtn).classList.add('btn-outline-light', 'reinstate');
};

const buttonClick = (e) => {
    const selectedBtn = e.target.id;
    if (selectedBtn === 'jumbotronBtn') {
        createForm();
        document.getElementById('sortButton').addEventListener('click', buttonClick);
    } else if (selectedBtn === 'sortButton') {
        printCard();
        
    } else {
        console.log(selectedBtn);
        convertToVoldermortsArmy(e);
    }
    
};

document.getElementById('jumbotronBtn').addEventListener('click', buttonClick);

