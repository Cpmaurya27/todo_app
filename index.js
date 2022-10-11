let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('dateInput');
let add = document.getElementById('add');
let description = document.getElementById('textarea');
let tasks = document.getElementById("tasks");
let data =[];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
});

let showTasks = () =>{
    let task = JSON.parse(localStorage.getItem('tasks'));
    tasks.innerHTML='';
    task.map((item, index) => {
        return(tasks.innerHTML += `<div id="${index}">
        <span class="fw-bold">${item.text}</span>
        <span class="small text-secondary">${item.date}</span>
        <p>${item.description}</p>
        <span id="btn">
          <i class="bi bi-pencil-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
          <i class="bi bi-trash" onclick="deleteTask(this)"></i>
        </span>

      </div>`)
    });

    resetForm();
};

let resetForm = () =>{
    textInput.value = '';
    dateInput.value = '';
    description.value= '';
}

let acceptData = () =>{
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: description.value

    });
    localStorage.setItem('tasks', JSON.stringify(data));
    showTasks();
    
};

let formValidation = () => {
    if(textInput.value === ""){
        msg.innerHTML = "* Task title can not be blank";
    }
    else{
        msg.innerHTML = "";
        acceptData();
        add.setAttribute('data-bs-dismiss','modal');
        add.click();
        (() =>{
            add.setAttribute('data-bs-dismiss',''); 
        })();
    }
}

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('tasks', JSON.stringify(data));
}

let editTask = (e) =>{
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
}

(()=>{
    data = JSON.parse(localStorage.getItem('tasks')) || [];
    showTasks();
})();