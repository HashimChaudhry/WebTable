// First, we create an event that allows the user to add a new value to the table
function addRow() {
    // Check to ensure that a new row isn't already being added
    if(document.getElementById("webTable_name")) {
        return;
    }

    // Information about the table and add a new row
    let table = document.getElementById("webTable"); // Get the table
    let numRows = table.rows.length; // Get the number of rows present in the table
    let newRow = table.insertRow(numRows); // Add a row at the end of the list
    newRow.classList.add("webTable_row");

    // Style new row accordingly
    oddRowStyle(table, numRows, newRow);

    //  Make the Add Row button visible to confirm if the user wants to add the row
    fillButton("confirmButton", "Add Row");
    fillButton("cancelButton", "Cancel Row");
    makeVisible("confirmButton");
    makeVisible("cancelButton");

    // Now, add generate some inputs to each row
    let name = createInput("text", "webTable_name");
    let email = createInput("text", "webTable_email");
    let level = createDropdown(-1);

    // Append the inputs to the table row
    setUpCells(newRow, name, email, level, cancelAdd, false);

    document.addEventListener("keydown", addEnter);
}

// Function that will add a row to the list
function confirmAdd() {
    // Get necessary elements from DOM
    let name = document.getElementById("webTable_name");
    let email = document.getElementById("webTable_email");
    let level = document.getElementById("webTable_level");

    // Error message details
    let msg = ""; // Error message to display

    // Set up the table for adding a cell
    let info = getInfo();
    let table = info.table;
    let numRows = info.numRows;

    // Get the values in each form input
    name = name.value;
    email = email.value;
    level = level.value;

    // Validate table
    if(!validInfo(name, email)) {
        return;
    }

    // Insert the new row
    let newRow = table.insertRow(numRows); // Add a row at the end of the list
    newRow.classList.add("webTable_row");
    newRow.addEventListener("click", editTable); // Add the event listener to the row

    // Remove the row from the table
    document.getElementById("webTable").deleteRow(numRows - 1);
    numRows -= 1; // Update numRows accordingly

    // Now append these to the table and style accordingly
    oddRowStyle(table, numRows);

    // Set up the cells
    setUpCells(newRow, name, email, level, deleteRow, true);

    // Make visibility of confirm buttons hidden again
    clearButton("confirmButton");
    clearButton("cancelButton");
    makeHidden("confirmButton");
    makeHidden("cancelButton");

    // Clear hotkeys
    document.removeEventListener("keydown", addEnter);
}

// Function that allows us to cancel a row
function cancelAdd() {
    // Make visibility of confirm buttons hidden again
    clearButton("confirmButton");
    clearButton("cancelButton");
    makeHidden("confirmButton");
    makeHidden("cancelButton");

    // Cancel the selection
    let table = document.getElementById("webTable");
    let numRows = table.rows.length; // Get the number of rows present in the table

    // Now, delete the row
    removeRow("webTable", numRows - 1);
}

// Delete a row from the table
function deleteRow(e) {
    // For this function, we need info on the event
    if(!e) {
        e = window.event;
    }

    // Get the target of the event (should be the remove image)
    let target = e.target;

    // We now jump up two elements to get the table row to delete
    let row = target.parentElement;
    row = row.parentElement;
    let index = row.rowIndex;

    // Now, delete the table row element
    row.remove();

    // After deleting the row, we need to update all styles after it
    restyleRows(document.getElementById("webTable"), index);
}

// Function that allows in-table editing for the user
function editTable(e) {
    // Check to ensure that an edit isn't already being done
    if(document.getElementById("webTable_name")) {
        return;
    }

    //  Make the Add Edit button visible to confirm if the user wants to edit the row
    fillButton("editButton", "Add Edit");
    makeVisible("editButton");

    // We first need to get the table row the user selected
    if(!e) {
        e = window.event;
    }

    let target = e.target;
    target = target.parentElement;

    // Get information about the table and  row selected
    let index = target.rowIndex;
    let table = document.getElementById("webTable");


    // Get the values from the row
    let name = target.cells[0].innerHTML;
    let email = target.cells[1].innerHTML;
    let level = target.cells[2].innerHTML;

    // Get value of level for dropdown
    let levelValue;
    if(level === "Freshman") {
        levelValue = 0;
    } else if(level === "Sophomore") {
        levelValue = 1;
    } else if(level === "Junior") {
        levelValue = 2;
    } else if(level === "Senior")
        levelValue = 3;
    else {
        levelValue = -1;
    }

    // Now, delete the row
    table.deleteRow(index);

    // Now, rewrite the row but with text boxes and form options
    let newRow = table.insertRow(index);

    // Now add the form options
    let nameInput = createInput("text", "webTable_name", name)
    let emailInput = createInput("text", "webTable_email", email)
    let levelInput = createDropdown(levelValue);

    // Set the default values for these inputs based on previous values
    nameInput.value = name;
    emailInput.value = email;

    // Set up the cells
    setUpCells(newRow, nameInput, emailInput, levelInput, cancelEdit, false);

    document.addEventListener('keydown', editEnter);
}

// Function that confirms any edits to the table
function confirmEdit() {
    // Table information
    let table = document.getElementById("webTable");

    // Get all data from the forms
    // Now grab the necessary fields from the form
    let name = document.getElementById("webTable_name").value;
    let email = document.getElementById("webTable_email").value;
    let level = document.getElementById("webTable_level").value;

    // Get the table row where the edits are to be committed
    let rowEdited = document.getElementById("webTable_name");
    rowEdited = rowEdited.parentElement.parentElement;
    let index = rowEdited.rowIndex;

    // Validate table
    if(!validInfo(name, email)) {
        return;
    }

    // Delete the current row
    table.deleteRow(index);

    let newRow = table.insertRow(index);

    // Make visibility of edit buttons hidden
    clearButton("editButton");
    makeHidden("editButton");

    // Wrapper containers
    name = document.createTextNode(name);
    email = document.createTextNode(email);
    level = document.createTextNode(level);

    // Now create a new row that has all of the data collected
    // Create some new cells for the form
    let nameCell  = newRow.insertCell(0);
    let emailCell = newRow.insertCell(1);
    let levelCell = newRow.insertCell(2);
    let removeCell = newRow.insertCell(3);

    // Add necessary classes to the cells
    nameCell.classList.add("webTable_data");
    emailCell.classList.add("webTable_data");
    levelCell.classList.add("webTable_data");
    removeCell.classList.add("removeHidden");

    // Add an image to the remove cell
    let image = document.createElement("img");
    image.src = "../assets/delete.png";
    image.classList.add("tableButton");
    image.classList.add("removeButton");
    image.addEventListener("click", deleteRow);

    // Add an event to each table cell
    addListenerToClass("webTable_data", "click", editTable);

    // Restyle edited row
    oddRowStyle(table, index);

    // Append the form values to the row
    nameCell.appendChild(name);
    emailCell.appendChild(email);
    levelCell.appendChild(level);
    removeCell.appendChild(image);

    // Remove bindings on hotkeys
    document.removeEventListener('keydown', editEnter);
}


function addEvents() {
    // Create an event for the add to button allow us to add an element
    addClickHandler("addButton", addRow);

    // Create an event for the confirm button to confirm addition of a new row
    addClickHandler("confirmButton", confirmAdd);

    // Create an event to cancel an add of a new row
    addClickHandler("cancelButton", cancelAdd);

    // Event handler for removing a row
    addListenerToClass("removeButton", "click", deleteRow);

    // Event handler to edit table
    addListenerToClass("webTable_data", "click", editTable);

    // Event handler to confirm edits to the table
    addClickHandler("editButton", confirmEdit);
}

addEvents();