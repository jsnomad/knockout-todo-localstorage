//Initialize DatePicker
$( "#date" ).datepicker();

$("#alertSuccess").hide();
$("#confirm").hide();
$("#todoTabCompleted").hide();

$("#btnToDoCompleted").click(function() {
  $("#todoTabCompleted").show(300);
  $("#todoTabNotCompleted").hide();
});

$("#btnToDo").click(function() {
  $("#todoTabNotCompleted").show(300);
  $("#todoTabCompleted").hide();
});

function TodoItem(name, date) {
    var self = this;
    self.name = name;
    self.date = date;
}
function TodoViewModel() {
    var self = this;
    self.todos = ko.observableArray([
        ], { persist: 'Todo' });

    self.todosCompleted = ko.observableArray([
        ], { persist: 'TotoCompleted' });

    self.addNewTodo = function (form) {
        var todoName = document.getElementById('todoName').value;
        var date = document.getElementById('date').value;
        if (todoName) {
            self.todos.push(new TodoItem(todoName, date));
            $("#alertSuccess").show();
            $("#alertSuccess").delay(1000).hide("fast");
        }
    }

    self.removeTodo = function (todo) {
        bootbox.confirm("Etes vous sur de vouloir supprimer la tâche", function(result) {
         if (result === true) {                                             
           self.todos.remove(todo);                           
       }
   }); 
    }

    self.cleanToDoCompleted = function (todo) {
        self.todosCompleted.removeAll();                         
    }

    self.completeTodo = function (todo) {
        self.todosCompleted.push(todo);
        self.todos.remove(todo);
    }
}

ko.applyBindings(new TodoViewModel());