const axios = require('axios');

async function fetchTodos() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return response.data;
    } catch (error) {
        console.error('error fetching todos:', error);
        return [];
    }
}

async function createTodo(title, completed) {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: title,
            completed: completed
        });
        return response.data;
    } catch (error) {
        console.error('error creating todo:', error);
        return null;
    }
}

(async () => {
    const todos = await fetchTodos();
    console.log('todos:', todos);

    const newTodo = await createTodo('neww nih', false);
    if (newTodo) {
        console.log('new todo created:', newTodo);
    }
})();
