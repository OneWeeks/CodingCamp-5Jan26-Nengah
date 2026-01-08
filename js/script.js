const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterSelect = document.getElementById('filterSelect');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const noTaskMsg = document.getElementById('noTaskMsg');

let todos = [];

// Simpan ke localStorage
function saveTodos() {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Gagal menyimpan data:', error);
    }
}

// Ambil dari localStorage
function loadTodos() {
    try {
        const data = localStorage.getItem('todos');
        todos = data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Gagal memuat data:', error);
        todos = [];
    }
}

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
                <td>
                    <span class="status-badge ${todo.completed ? 'completed' : 'pending'}"
                        onclick="toggleStatus(${index})">
                        ${todo.completed ? 'COMPLETED' : 'PENDING'}
                    </span>
                </td>
                <td>
                    <button class="delete-item" onclick="deleteTodo(${index})">
                        Delete
                    </button>
                </td>
            `;
            todoList.appendChild(tr);
        });
    }
}

addBtn.onclick = () => {
    if (todoInput.value.trim() === '') {
        alert("Isi tugas dulu!");
        return;
    }

    todos.push({
        task: todoInput.value.trim(),
        date: dateInput.value,
        completed: false
    });

    saveTodos(); // ⬅️ SIMPAN DATA
    renderTodos(filterSelect.value);

    todoInput.value = '';
    dateInput.value = '';
};

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos(); // ⬅️ SIMPAN DATA
    renderTodos(filterSelect.value);
}

function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos(); // ⬅️ SIMPAN DATA
    renderTodos(filterSelect.value);
}

// Filter
filterSelect.onchange = (e) => renderTodos(e.target.value);

// Hapus Semua
deleteAllBtn.onclick = () => {
    if (confirm("Delete all the works?")) {
        todos = [];
        saveTodos(); // ⬅️ SIMPAN DATA
        renderTodos(filterSelect.value);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadTodos();     // ⬅️ AMBIL DATA
    renderTodos();   // ⬅️ TAMPILKAN
});