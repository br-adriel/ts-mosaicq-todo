import { useEffect } from 'react';

function App() {
  async function fetchTasks() {
    const res = await fetch('http://localhost:3000/tarefas');
    const tasks = await res.json();
    console.log(tasks);
  }

  useEffect(() => {
    fetchTasks();
  }, []);
  return <h1>Olá mundo</h1>;
}

export default App;
