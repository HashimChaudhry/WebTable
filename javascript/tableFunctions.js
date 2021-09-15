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
    let undergrad = document.createElement("option");
    let masters = document.createElement("option");
    let phd = document.createElement("option");

    // Add values to the option and set them up
    undergrad.value = "Undergraduate";
    masters.value = "Masters";
    phd.value = "PhD";

    // If we need a default index selected, do it now
    if(index === 0) {
        undergrad.selected = true;
    } else if (index === 1) {
        masters.selected = true;
    } else if(index === 2) {
        phd.selected = true;
    }

    // Add some text in between the option tags for the user
    undergrad.textContent = "Undergraduate";
    masters.textContent = "Masters";
    phd.textContent = "PhD";

    // Set up element ID
    level.id = "webTable_level";

    // Append the selection values to the form element
    level.appendChild(undergrad);
    level.appendChild(masters);
    level.appendChild(phd);

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