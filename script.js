document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))

    if (storedTasks) {
        storedTasks.forEach((task) => tasks.push(task))
        updateTaskList()
        updateStats()
    }

})

let tasks = []

const saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))

}

const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim()

    if (text) {
        tasks.push({ text: text, completed: false }) //pushing as object
        taskInput.value = ""

        updateTaskList()
        updateStats()
        saveTask()
    }
    else{
        alert('No tasks yet. Add one above ✨')
    }
}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed
    updateTaskList()
    updateStats()
    saveTask()
}

const deleteTask = (index) => {
    tasks.splice(index, 1)
    updateTaskList()
    updateStats()
    saveTask()
}

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTaskList()
    updateStats()
    saveTask()
}

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks / totalTasks) * 100
    const progressBar = document.getElementById('progress')

    progressBar.style.width = `${progress}%`

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`

    if(tasks.length && completedTasks === totalTasks){
        launchconfetti()
    }
}

const updateTaskList = () => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ""

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = ` 
        <div class="taskItem">
              <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
              </div>
              <div class="icons">
                <img src="img/pen.png" onClick="editTask(${index})" />
                <img src="img/trash.png"  onClick="deleteTask(${index})" />
              </div>
        </div>`


        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index))
        taskList.append(listItem)

    });
}

document.getElementById('submit').addEventListener("click", function (e) {
    e.preventDefault()

    addTask()
})

const launchconfetti = () => {
    const duration = 15 * 300,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("light");
    const btn = document.getElementById("toggleTheme");
    btn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});
