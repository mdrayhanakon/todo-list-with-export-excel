let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
    if (todoText) {
        todos.push(todoText);
        input.value = '';
        renderTodos();
        // Add a fade-in animation for new tasks
        const lastItem = document.querySelector('ul#todoList li:last-child');
        lastItem.classList.add('fade-in');
    }
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const noTask = document.getElementById('noTask');
    todoList.innerHTML = '';
    if (todos.length === 0) {
        noTask.style.display = 'block';
    } else {
        noTask.style.display = 'none';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${todo}</span>
                <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
}

function deleteTodo(index) {
    // Add a fade-out animation for deleted tasks
    const todoListItems = document.querySelectorAll('#todoList li');
    const itemToDelete = todoListItems[index];
    itemToDelete.classList.add('fade-out');
    
    // Wait for animation to finish before removing the task
    setTimeout(() => {
        todos.splice(index, 1);
        renderTodos();
    }, 500);
}

function exportToExcel() {
    if (todos.length === 0) {
        alert('No tasks to export!');
        return;
    }

    let table = '<table border="1"><tr><th>Task</th></tr>';
    todos.forEach(todo => {
        table += `<tr><td>${todo}</td></tr>`;
    });
    table += '</table>';

    const dataType = 'application/vnd.ms-excel';
    const blob = new Blob([table], { type: dataType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo-list.xls';
    a.click();
    URL.revokeObjectURL(url);
}

// Initial render with no tasks
renderTodos();
