const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterSelect = document.getElementById('filterSelect');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const noTaskMsg = document.getElementById('noTaskMsg');

let todos = [];

// Fungsi untuk merender list
function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter(t => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    if (filteredTodos.length === 0) {
        noTaskMsg.style.display = 'block';
    } else {
        noTaskMsg.style.display = 'none';
        filteredTodos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.date || '-'}</td>
                <td><span class="status-badge ${todo.completed ? 'completed' : 'pending'}" onclick="toggleStatus(${index})">
                    ${todo.completed ? 'COMPLETED' : 'PENDING'}
                </span></td>
                <td><button class="delete-item" onclick="deleteTodo(${index})">Delete</button></td>
            `;
            todoList.appendChild(tr);
        });
    }
}

// Tambah Todo
addBtn.onclick = () => {
    if (todoInput.value.trim() === '') return alert("Isi tugas dulu!");
    todos.push({
        task: todoInput.value,
        date: dateInput.value,
        completed: false
    });
    todoInput.value = '';
    dateInput.value = '';
    renderTodos();
};

// Hapus satu
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Ubah Status
function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Filter
filterSelect.onchange = (e) => renderTodos(e.target.value);

// Hapus Semua
deleteAllBtn.onclick = () => {
    if(confirm("Delete all the works?")) {
        todos = [];
        renderTodos();
    }
};