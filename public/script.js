const taskList = document.getElementById('taskList');

// Fetch tasks from the server
function fetchTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${task.task} (Due: ${task.due_date})
                    <button onclick="editTask(${task.id}, '${task.task}', '${task.due_date}')">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('due_date');
    const task = taskInput.value;
    const due_date = dueDateInput.value; // Get the date directly from the input

    if (task && due_date) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, due_date }) // Send the date as is
        })
        .then(response => response.json())
        .then(() => {
            taskInput.value = '';
            dueDateInput.value = '';
            fetchTasks();
        });
    } else {
        alert('Please fill in both fields.');
    }
}

// Edit a task
function editTask(id, currentTask, currentDueDate) {
    const newTask = prompt('Edit task:', currentTask);
    
    // Prompt for a new date and set it to the current due date
    const newDueDate = prompt('Edit due date (YYYY-MM-DD):', currentDueDate.split('T')[0]); // Split to get only the date part

    if (newTask && newDueDate) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: newTask, due_date: newDueDate }) // Send only the date part
        })
        .then(() => fetchTasks());
    }
}

// Delete a task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchTasks());
    }
}

// Initial fetch of tasks
fetchTasks();