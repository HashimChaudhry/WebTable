// Functions that allow buttons to be visible or invisible
function makeVisible(id) {
    let button = document.getElementById(id)
    button.classList.remove("hidden");
    button.classList.add("visible");
}

function makeHidden(id) {
    let button = document.getElementById(id)
    button.classList.remove("visible");
    button.classList.add("hidden");
}

// Check to see if table row is odd and style accordingly
function oddRowStyle(table, rowNumber) {
    let row = table.rows[rowNumber];

    if (rowNumber % 2 !== 0) {
        row.classList.add("odd");
    } else {
        row.classList.remove("odd");
    }
}

// Fill in a elements text value
function fillButton(id, text) {
    document.getElementById(id).innerHTML = ''; // Clear any text
    let elem = document.getElementById(id);
    elem.appendChild(document.createTextNode(text));
}

// Clear in a elements text value
function clearButton(id) {
    document.getElementById(id).innerHTML = ''; // Clear any text
}

// Add a click event handler to an element
function addClickHandler(id, func) {
    let element = document.getElementById(id);
    element.addEventListener("click", func);
}

// Function that allows us to remove a row
function removeRow(tableID, rowIndex) {
    document.getElementById(tableID).deleteRow(rowIndex);
}

// Function that gets info on the table
function getInfo() {
    // Information about the table and add a new row
    let table = document.getElementById("webTable"); // Get the table
    let numRows = table.rows.length; // Get the number of rows present in the table

    return  {table: table, numRows: numRows};

}

function createInput(type, id = "", value = "") {
    let input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.value = value;

    return input;
}

function setUpCells(newRow, name, email, level, imageEvent, isTextNode) {
    let nameCell  = newRow.insertCell(0);
    let emailCell = newRow.insertCell(1);
    let levelCell = newRow.insertCell(2);
    let removeCell = newRow.insertCell(3);

    // Set the class value for remove cell
    removeCell.classList.add("removeHidden");
    nameCell.classList.add("webTable_data");
    emailCell.classList.add("webTable_data");
    levelCell.classList.add("webTable_data");

    // Add an image to the remove Cell
    let image = document.createElement("img");
    image.src = "../assets/delete.png";
    image.classList.add("tableButton");
    image.classList.add("removeButton");
    image.alt = "remove";
    image.addEventListener("click", imageEvent)

    // If we need a text node, do the conversion
    if(isTextNode) {
        name = document.createTextNode(name);
        email = document.createTextNode(email);
        level = document.createTextNode(level);
    }

    nameCell.appendChild(name);
    emailCell.appendChild(email);
    levelCell.appendChild(level);
    removeCell.appendChild(image);
}

function addListenerToClass(className, event, functionName) {
    let elements = document.getElementsByClassName(className);

    for(let i = 0; i < elements.length; i++) {
        elements.item(i).addEventListener(event, functionName);
    }
}

// Function creates a standard dropdown
function createDropdown(index) {
    let level = document.createElement("select");

    // For the level, add options to select from
    let freshman = document.createElement("option");
    let sophomore = document.createElement("option");
    let junior = document.createElement("option");
    let senior = document.createElement("option");

    // Add values to the option and set them up
    freshman.value = "Freshman";
    sophomore.value = "Sophomore";
    junior.value = "Junior";
    senior.value = "Senior";

    // If we need a default index selected, do it now
    if(index === 0) {
        freshman.selected = true;
    } else if (index === 1) {
        sophomore.selected = true;
    } else if(index === 2) {
        junior.selected = true;
    } else if(index === 3) {
        senior.selected = true;
    }

    // Add some text in between the option tags for the user
    freshman.textContent = "Freshman";
    sophomore.textContent = "Sophomore";
    junior.textContent = "Junior";
    senior.textContent = "Senior"

    // Set up element ID
    level.id = "webTable_level";

    // Append the selection values to the form element
    level.appendChild(freshman);
    level.appendChild(sophomore);
    level.appendChild(junior);
    level.appendChild(senior);

    return level;
}

// This function will restyle all rows after the row with index rowStart
function restyleRows(table, rowStart) {
    let length = table.rows.length; // Get the number of rows in the table

    // Go through each row and restyle
    for(let i = rowStart; i < length; i++) {
        oddRowStyle(table, i);
    }
}

// Function that sanitizes all form inputs to prevent XSS attacks
// Note that this function cannot be relied upon; if Javascript is
// disabled, then a malicious user may be able to use XSS attacks.
// Always do input validation on the server-side with a back-end language
function sanitizeInput(field) {
    let symbols = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
        "`": '&grave'
    };

    const reg = /[&<>"'/]/ig;
    return field.replace(reg, (match)=>(symbols[match]));
}

// Function that validates email
function validEmail(field) {
    if(field === "") {
        return false;
    } else if(!((field.indexOf(".") > 0) && (field.indexOf("@") > 0)) || /[^a-zA-Z0-9.@_-]/.test(field)) {
        return false;
    }

    return true;
}

// Function that checks to see if field is empty from form input
function isEmpty(field) {
    return field === "";
}

// Function that displays error message
function errorMessage(id, msg) {
    // Sanitize all input
    msg = sanitizeInput(msg);

    // Set up the element's error message
    let element = document.getElementById(id);
    element.innerText = msg;
}

// Specific function for validating input in this table
function validInfo(name, email) {
    let msg = "";

    // Sanitize all user-entered input
    name = sanitizeInput(name);
    email = sanitizeInput(email);

    // Make necessary checks to ensure that data entered is valid
    if(isEmpty(name) || isEmpty(email)) {
        msg += "One or more fields are empty; ";
    }

    if(!validEmail(email)) {
        msg += "Email is invalid; ";
    }

    if(msg !== "") { // If there is a message to display, do it now
        errorMessage("warningMessage", msg);
        makeVisible("warning");
        return false; // Exit early
    } else {
        makeHidden("warning");
        errorMessage("warningMessage", "");
        return true;
    }
}

// Adds keyboard events for enter keys
function addEnterEvents(func) {
    document.addEventListener('keydown', (event) => {
        let name = event.key;

        if(name === "Enter" || name === "Escape") {
            func();
        }
    });
}

// Add enter function for table (allows hotkeys for table)
function addEnter(e) {
    let name = e.key;

    if (name === "Enter" || name === "Escape") {
        confirmAdd();
    }
}

// Edit enter function for table (allows hotkeys for table)
function editEnter(e) {
    let name = e.key;

    if (name === "Enter" || name === "Escape") {
        confirmEdit();

        clearButton("confirmButton");
        clearButton("cancelButton");
        makeHidden("confirmButton");
        makeHidden("cancelButton");
    }

}

// Function that handles deleting a row that is being edited
function cancelEdit() {
    // Get the table row where the edits are to be committed
    let rowEdited = document.getElementById("webTable_name");
    rowEdited = rowEdited.parentElement.parentElement;
    console.log(rowEdited);

    let index = rowEdited.rowIndex;

    removeRow("webTable", index);

    // Restyle Rows
    restyleRows(document.getElementById("webTable"), index)

    // Make visibility of edit buttons hidden
    clearButton("editButton");
    makeHidden("editButton");
}

