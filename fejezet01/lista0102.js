const mongoose = require('mongoose');

// Csatlakozás a MongoDB-hez
mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TodoItem séma definiálása
const todoItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

// TodoItem modell létrehozása
const TodoItem = mongoose.model('TodoItem', todoItemSchema);

// Függvény új teendő létrehozására
async function createTodoItem(title, description) {
  const newItem = new TodoItem({
    title,
    description,
    completed: false,
  });

  try {
    await newItem.save();
    return newItem;
  } catch (error) {
    throw error;
  }
}

// Függvény az összes teendő olvasására
async function getAllTodoItems() {
  try {
    const todoItems = await TodoItem.find();
    return todoItems;
  } catch (error) {
    throw error;
  }
}

// Függvény adott teendő olvasására azonosító szerint
async function getTodoItemById(id) {
  try {
    const todoItem = await TodoItem.findById(id);
    return todoItem || null;
  } catch (error) {
    throw error;
  }
}

// Függvény teendő frissítésére azonosító szerint
async function updateTodoItem(id, updatedData) {
  try {
    const updatedItem = await TodoItem.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedItem;
  } catch (error) {
    throw error;
  }
}

// Függvény teendő törlésére azonosító szerint
async function deleteTodoItem(id) {
  try {
    const deletedItem = await TodoItem.findByIdAndRemove(id);
    return deletedItem || null;
  } catch (error) {
    throw error;
  }
}
