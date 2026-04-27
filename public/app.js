const list = document.getElementById('taskList');

async function fetchTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    list.innerHTML = tasks.map(t => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="${t.completed ? 'text-decoration-line-through text-muted' : ''}" 
                  onclick="toggleTask(${t.id})" style="cursor:pointer">
                ${t.title} ${t.completed ? '<span class="badge bg-secondary ms-2">Done</span>' : ''}
            </span>
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${t.id})">Delete</button>
        </li>
    `).join('');
}

async function addTask() {
    const title = document.getElementById('taskInput').value;
    if (!title) return;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    document.getElementById('taskInput').value = '';
    fetchTasks();
}

async function toggleTask(id) {
    await fetch(`/api/tasks/${id}/toggle`, { method: 'PUT' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
}

fetchTasks();