//Problem: User interaction doesn't provide desired results.
//Solution: Add interactivty so the user can manage daily tasks.

//GLOBAL VARIABLES

var taskInput = document.getElementById("new-task"); //new-task text input
var addButton = document.getElementsByTagName("button")[0]; //first button on page
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks ul
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks ul


//FUNCTIONS

//New task list item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input");
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input");
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

  //each element needs modifying

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

//Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
  //console.log("Edit task...");
  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
  var editButton = listItem.querySelector("button.edit");
  //if the class of the parent is .editMode
  if(containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  //Toggle .editMode on the list item
  listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //remove the parent li from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("task complete...");
  //append the task li to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("task incomplete...");
  //append the task li to the #incompleted-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deletTask to delete button
  deleteButton.onclick = deleteTask;

  //bind taskCompleted to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

//Set the click handler to the addTask function
var ajaxRequest = function() {
  console.log("Placeholder for AJAX request");
}
//addButton.onclick = addTask; //this only handles on event listener per element
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//CODE

//Complete tasks
//cycle over incompleteTasksHolder ul li
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to li's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul li
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to li's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}




