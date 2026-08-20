const API_URL = "https://jsonplaceholder.typicode.com/todos/";

const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const todoTable = document.getElementById("todoTable");
const loading = document.getElementById("loading");

loadBtn.addEventListener("click", loadTodos);
clearBtn.addEventListener("click", clearTable);

async function loadTodos() {
    loading.style.display = "block";
    todoTable.innerHTML = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load API data.");
        }

        const todos = await response.json();

        todos.forEach(todo => {
            const row = document.createElement("tr");

            const userId = document.createElement("td");
            userId.textContent = todo.userId;

            const taskId = document.createElement("td");
            taskId.textContent = todo.id;

            const title = document.createElement("td");
            title.textContent = todo.title;

            const status = document.createElement("td");

            if (todo.completed) {
                status.textContent = "Completed";
                status.className = "completed";
            } else {
                status.textContent = "Not yet Completed";
                status.className = "not-completed";
            }

            row.appendChild(userId);
            row.appendChild(taskId);
            row.appendChild(title);
            row.appendChild(status);

            todoTable.appendChild(row);
        });

    } catch (error) {
        alert("Error loading data: " + error.message);
    }

    loading.style.display = "none";
}

function clearTable() {
    todoTable.innerHTML = "";
}