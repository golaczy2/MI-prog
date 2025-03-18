// Szimulált memóriában tárolt adatbázis a teendőkhöz
const todoListDB = [];

// Függvény új teendő létrehozására
function createTodoItem(title, description) {
  const newItem = {
    id: todoListDB.length + 1,
    title,
    description,
    completed: false,
  };

  todoListDB.push(newItem);
  return newItem;
}

// Függvény az összes teendő olvasására
function getAllTodoItems() {
  return todoListDB;
}

// Függvény adott teendő olvasására azonosító szerint
function getTodoItemById(id) {
  const todoItem = todoListDB.find((item) => item.id === id);
  return todoItem || null;
}

// Függvény teendő frissítésére azonosító szerint
function updateTodoItem(id, updatedData) {
  const todoItemIndex = todoListDB.findIndex((item) => item.id === id);

  if (todoItemIndex !== -1) {
    todoListDB[todoItemIndex] = {
      ...todoListDB[todoItemIndex],
      ...updatedData,
    };
    return todoListDB[todoItemIndex];
  }

  return null;
}

// Függvény teendő törlésére azonosító szerint
function deleteTodoItem(id) {
  const todoItemIndex = todoListDB.findIndex((item) => item.id === id);

  if (todoItemIndex !== -1) {
    const deletedItem = todoListDB.splice(todoItemIndex, 1)[0];
    return deletedItem;
  }

  return null;
}

// Használati példa:
createTodoItem('Bevásárlás', 'Tej, tojás, kenyér');
createTodoItem('Projekt befejezése', 'Programozási feladat elvégzése');
console.log(getAllTodoItems());
console.log(getTodoItemById(1));
updateTodoItem(1, { completed: true });
console.log(getAllTodoItems());
deleteTodoItem(2);
console.log(getAllTodoItems());
