class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        localStorage.setItem('tasks',task)
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }
    editTask(id,newDescription){
        const task = this.tasks.find(task => task.id === id)
        if(task){
            task.description = newDescription
            this.saveTasks()
            this.loadTasks()
            this.renderTasks()
        }

    }

    toggleTaskComplete(id) {
        const taskStatus = this.tasks.find(task => task.id === id);
        if (taskStatus) { 
            taskStatus.toggleComplete()
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if(this.tasks.length > 0){
            this.tasks = tasks.map(task => new Task(task.id, task.description, task.completed));
        }
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            const $p = document.createElement('P')
            $p.textContent = task.description;
            item.appendChild($p)
            const $labelCheckBox = document.createElement('LABEL')
            const $checkBox = document.createElement('input')
            $checkBox.type = 'checkbox'
            $labelCheckBox.textContent = 'Completed'
            item.appendChild($labelCheckBox)
            item.appendChild($checkBox)
            item.className = task.completed ? 'completed' : '';
            if(item.className === 'completed'){
                $p.style.color = 'green'
                $labelCheckBox.textContent = 'Discompleted'
            }
            else{
                $p.style.color = ""
            }
            $checkBox.addEventListener('click', (e) =>{ 
                e.stopPropagation()
                this.toggleTaskComplete(task.id)
                
            });

            // Edit Button
            const $editButton = document.createElement('BUTTON')
            $editButton.textContent = 'EDIT'
            $editButton.addEventListener('click',e =>{
                e.stopPropagation();
                const newDescriptionTask = prompt("Please enter the new descripcion")
                if(newDescriptionTask === null || newDescriptionTask === ""){
                    alert('please enter a valid Description')
                    return
                }
                this.editTask(task.id,newDescriptionTask)

            })
            // Delete Button
            const $deleteButton = document.createElement('button');
            $deleteButton.textContent = 'DELETE';
            $deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });
            item.appendChild($labelCheckBox)
            item.appendChild($editButton);
            item.appendChild($deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});

// The commun mistakes were that the localStorage wasn't set correctly and edit  and mark tas wasn't finished correctly