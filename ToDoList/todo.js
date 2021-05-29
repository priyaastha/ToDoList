//Select DOM
const todoInput = document.querySelector(".input");
const todoButton = document.querySelector(".addbtn");
const todoList = document.querySelector(".todo-list");
const clear = document.querySelector(".clear");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo); //for add button
clear.addEventListener("click", clearall); //for add button
todoList.addEventListener("click", deleteTodo); //for delete and check button

//function to add task
function addTodo(e) {
    //if the input text is empty and button is clicked
    if(todoInput.value == ""){
        document.getElementById("error").innerHTML = "Add a todo!";
        setTimeout(function(){ 
            document.getElementById("error").innerHTML = "";
        }, 1000);
    } 
    else {
        //Create todo div
        const todoDiv = document.createElement("div");//create a div element 
        todoDiv.classList.add("todo"); //add class name to the div
        //Create list
        const newTodo = document.createElement("li");//create a list element
        newTodo.innerText = todoInput.value;  //the value of the li will be same as input
        newTodo.classList.add("todo-item"); //add class name to the li
        todoDiv.appendChild(newTodo); //to put the newTodo inside the todo div
        //Create Completed Button
        const complete = document.createElement("button");//create button element
        complete.innerHTML = `<i class='fa fa-check'></i>`;//add image to button
        complete.classList.add("complete");//add class name to the button
        todoDiv.appendChild(complete);//to put the button inside the todo div
        //Create Delete button
        const deleted = document.createElement("button");//create button element 
        deleted.innerHTML = `<i class="fa fa-trash"></i>`;//add image to button
        deleted.classList.add("deleted");//add class name to the button
        todoDiv.appendChild(deleted);//to put the button inside the todo div
        //attach final Todo as child of TodoList
        todoList.appendChild(todoDiv);
        //Save to local storage
        saveLocalTodos(todoInput.value);
        //to set the input box as null after adding the task
        todoInput.value = "";
    }
}
    
//function to delete and check the task
function deleteTodo(e) {
    //take the target item(i.e. the place where we click on the whole div todoList)
    const item = e.target;
    //declare a variable and make it equal to the parent div of the button i.e. todoList
    const todo = item.parentElement;

    //if the delete button is clicked
    if (item.classList[0] === "deleted"){ 
        removeLocalTodos(todo); //calling function to remove todo from localhost
        todo.remove();  //to remove button along with its parent div i.e. todoList       
    }

    //if check button is clicked
    if (item.classList[0] === "complete"){
        todo.classList.toggle("completed");//to change the properties each time the check button is clicked
    }
}

//function to clear all the tasks 
function clearall(e){
    clearStorage(); //function called clear all data from local storage
    var ul = document.getElementById('todo-list'); //get everything that's in ul
    var lis = ul.children; //grt li
    for(var i=0; i<lis.length; i++){ //traverse all the li one by one and deleting them
        while(lis[i]){
            ul.removeChild(lis[i])
        }
    }
}

//Function to add in local storage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } 
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //to add in todo
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

//function to remove from local storage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } 
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText; //to get the task added
    todos.splice(todos.indexOf(todoIndex), 1); //to get index
    localStorage.setItem("todos", JSON.stringify(todos)); //to finally remove
}

//function to clear localstorage
function clearStorage(){
    localStorage.clear();
}
  

function getTodos() {
    let todos;
    //if the storage is empty
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } 
    //if storage is not empty
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //Create Completed Button
        const complete = document.createElement("button");
        complete.innerHTML = `<i class='fa fa-check'></i>`;
        complete.classList.add("complete");
        todoDiv.appendChild(complete);
        //Create Delete button
        const deleted = document.createElement("button");
        deleted.innerHTML = `<i class="fa fa-trash"></i>`;
        deleted.classList.add("deleted");
        todoDiv.appendChild(deleted);
        //attach final Todo as child of TodoList
        todoList.appendChild(todoDiv);
    });
}