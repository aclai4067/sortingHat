const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

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
                    <input type="password" class="form-control" id="inputPassword2" placeholder="John Doe">
                </div>
                <div class="col-auto">
                    <button type="submit" id="sortButton" class="btn btn-outline-success mb-2">Sort!</button>
                </div>
            </div>
        </form>
    `;
    printToDom('formDiv', formString);
    document.getElementById('jumbotronBtn').style.display = "none";
};

const createCard = () => {

};

const buttonClick = (e) => {
    const selectedBtn = e.target.id;
    if (selectedBtn === 'jumbotronBtn') {
        createForm();
    }
    
};

document.getElementById('jumbotronBtn').addEventListener('click', buttonClick);