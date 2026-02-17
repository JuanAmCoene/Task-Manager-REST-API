const API_URL = 'http://localhost:3000/api/tasks';

// DOM Elements
const addTaskForm = document.getElementById('addTaskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksList = document.getElementById('tasksList');
const taskCount = document.getElementById('taskCount');

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task form submission
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newTask = {
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim()
    };
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        
        if (response.ok) {
            taskTitle.value = '';
            taskDescription.value = '';
            loadTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
});

// Load all tasks from API
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success) {
            displayTasks(result.data);
            updateTaskCount(result.count);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasksList.innerHTML = '<div class="empty-state">Failed to load tasks. Make sure the server is running.</div>';
    }
}

// Display tasks in the UI
function displayTasks(tasks) {
    if (tasks.length === 0) {
        tasksList.innerHTML = '<div class="empty-state">No tasks yet. Add one above!</div>';
        return;
    }
    
    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <div class="task-header">
                <div class="task-title">${escapeHtml(task.title)}</div>
            </div>
            ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
            <div class="task-actions">
                <button class="btn btn-small btn-success" onclick="toggleTask(${task.id}, ${!task.completed})">
                    ${task.completed ? '↩️ Undo' : '✓ Complete'}
                </button>
                <button class="btn btn-small btn-danger" onclick="deleteTask(${task.id})">
                    🗑️ Delete
                </button>
            </div>
            <div class="task-meta">
                Created: ${new Date(task.createdAt).toLocaleString()}
            </div>
        </div>
    `).join('');
}

// Update task count
function updateTaskCount(count) {
    taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}

// Toggle task completion status
async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
        alert('Failed to update task. Please try again.');
    }
}

// Delete a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task. Please try again.');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
