document.addEventListener("DOMContentLoaded", fetchEmployees);

let editMode = false;
let currentEditId = null;

// 1. Fetch and Display Employees
async function fetchEmployees() {
    try {
        const response = await fetch("http://localhost:8080/api/employees");
        const employees = await response.json();
        const tableBody = document.getElementById("employeeTableBody");
        tableBody.innerHTML = ""; 

        employees.forEach(emp => {
            const row = `<tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>
                    <button class="btn-warning" onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.department}')">Edit</button>
                    <button class="btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// 2. Combined Add / Update Function
async function saveEmployee() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("dept").value;
    const employeeData = { name, email, department };

    let url = "http://localhost:8080/api/employees";
    let method = "POST";

    // If we are in edit mode, change to PUT and add the ID to URL
    if (editMode) {
        url = `http://localhost:8080/api/employees/${currentEditId}`;
        method = "PUT";
    }
    // --- NEW VALIDATION CHECK ---
    if (!name || !email || !department) {
        alert("Wait! All fields must be filled out before saving.");
        return; // This stops the function from continuing
    }

    const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData)
    });

    if (response.ok) {
        alert(editMode ? "Updated successfully!" : "Saved successfully!");
        resetForm();
        fetchEmployees();
    }
}

// 3. Enter Edit Mode
function editEmployee(id, name, email, dept) {
    editMode = true;
    currentEditId = id;
    
    // 1. Fill the inputs
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("dept").value = dept;
    
    // 2. Change Heading and Button text
    document.getElementById("form-heading").innerText = "Update Employee Details";
    document.getElementById("submitBtn").innerText = "Update Employee";
    
    // 3. Show the Cancel button
    document.getElementById("cancelBtn").style.display = "inline-block";
}

// 4. Delete Function
async function deleteEmployee(id) {
    if (confirm("Delete this employee?")) {
        await fetch(`http://localhost:8080/api/employees/${id}`, { method: "DELETE" });
        fetchEmployees();
    }
}

function resetForm() {
    editMode = false;
    currentEditId = null;
    
    // 1. Clear the inputs
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("dept").value = "";
    
    // 2. Reset Heading and Button text
    document.getElementById("form-heading").innerText = "Add New Employee";
    document.getElementById("submitBtn").innerText = "Add Employee";
    
    // 3. Hide the Cancel button again
    document.getElementById("cancelBtn").style.display = "none";
}