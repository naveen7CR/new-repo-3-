let tasks = [];

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    input.value = "";
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        li.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });

    updateProgress();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateProgress() {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;

    const percent = total === 0 ? 0 : (completed / total) * 100;
    document.getElementById("progressFill").style.width = percent + "%";
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}