function addEmployee(){
    // 1. Grab the data the user typed into the input boxes
    let empName = document.getElementById("name").value;
    let empEmail = document.getElementById("email").value;
    let empDept =document.getElementById("dept").value;

// 2. Stop the code if the user left something blank (Basic Validation)
if (empName === "" || empEmail === "" || empDept === "") {
        alert("Please fill in all the fields!");
        return; 
    }

// 3. Find the table body in our HTML
    let tableBody = document.querySelector("tbody");
    let rowCount = tableBody.rows.length + 1;
    let NewRow = tableBody.insertRow();
// 4. Create a new row and insert the HTML for the data
    let newRow =tableBody.insertRow();
    newRow.innerHTML =  `
        <td>${rowCount}</td>
        <td>${empName}</td>
        <td>${empEmail}</td>
        <td>${empDept}</td>
    `;
// 5. Clear the form so it's ready for the next person
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dept").value = "";
 }

 