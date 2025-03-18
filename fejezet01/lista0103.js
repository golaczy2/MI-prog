// Használati példa:
(async () => {
  try {
    const newItem = await createTodoItem(
      'Bevásárlás',
      'Tej, tojás, kenyér'
    );
    console.log('Teendő létrehozva:', newItem);

    const allItems = await getAllTodoItems();
    console.log('Összes teendő:', allItems);

    const itemToUpdate = await getTodoItemById(newItem._id);
    if (itemToUpdate) {
      const updatedItem = await updateTodoItem(itemToUpdate._id, {
        completed: true,
      });
      console.log('Teendő frissítve:', updatedItem);
    }

    const deletedItem = await deleteTodoItem(newItem._id);
    console.log('Teendő törölve:', deletedItem);
  } catch (error) {
    console.error('Hiba:', error);
  } finally {
    mongoose.disconnect();
  }
})();
