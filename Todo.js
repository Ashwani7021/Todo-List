// Initialize TodoList from local storage or as an empty array if no data exists
let TodoList = JSON.parse(localStorage.getItem('todos')) || []; 
DisplayItems(); // Display existing items when the page loads

// Function to add a new todo item
function addTodo() {
    let inputElement = document.querySelector('#Todo-input');
    let dueDateElement = document.querySelector('#add-due-date');

    let TodoItem = inputElement.value.trim();
    let dueDate = dueDateElement.value;

    // Check if both the todo item and due date are provided
    if (TodoItem && dueDate) {
        // Push a new object containing the task and due date into the TodoList array
        TodoList.push({
            task: TodoItem,
            dueDate: dueDate
        });

        // Clear the input fields after adding the item
        inputElement.value = '';
        dueDateElement.value = '';
        
        // Save the updated TodoList to local storage
        saveToLocalStorage();
        DisplayItems();
    }
}

// Set up an event listener for the "Add" button
let Target = document.querySelector('#add');
Target.addEventListener('click', addTodo);

// Function to display the items in the TodoList
function DisplayItems() {
    let ContainerElement = document.querySelector('.Container');
    let newHtml = ''; // Initialize an empty string to build the HTML for the todo items

    // Loop through the TodoList array
    for (let i = 0; i < TodoList.length; i++) {
        // Create HTML for each todo item and a delete button
        newHtml += `<span>${TodoList[i].task} (Due: ${TodoList[i].dueDate})</span>
                    <button onclick="deleteTodo(${i})">Delete</button><br>`;
    }

    // Update the inner HTML of the container with the new content
    ContainerElement.innerHTML = newHtml; 
}

// Function to delete a todo item by its index
function deleteTodo(index) {
    // Remove the item at the specified index from the TodoList array
    TodoList.splice(index, 1); 
    
    // Save the updated TodoList to local storage after deletion
    saveToLocalStorage();
    
    // Update the display of todo items
    DisplayItems(); 
}

// Function to save the TodoList to local storage
function saveToLocalStorage() {
    // Convert the TodoList array to a JSON string and store it in local storage
    localStorage.setItem('todos', JSON.stringify(TodoList)); 
}
