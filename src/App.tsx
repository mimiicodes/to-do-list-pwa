import { useState, useEffect } from 'react'
import './App.scss'

type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  date: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState(" ");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error("Error parsing tasks from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
      date: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const changePriority = (id: number, newPriority: "High" | "Medium" | "Low") => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const startEditing = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditingText(text);
  };

  const saveEditing = (id: number) => {
    editTask(id, editingText);
    setEditingTaskId(null);
    setEditingText("");
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          id="task-input"
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select id="priority-select" value={priority} onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low") }>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
            <input
              id={`checkbox-${task.id}`}
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(task.id)}
            />
            {editingTaskId === task.id ? (
              <input 
                id={`edit-input-${task.id}`}
                type="text" 
                value={editingText} 
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <select id={`priority-${task.id}`} value={task.priority} onChange={(e) => changePriority(task.id, e.target.value as "High" | "Medium" | "Low")}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {editingTaskId === task.id ? (
              <button onClick={() => saveEditing(task.id)}>Save</button>
            ) : (
              <button onClick={() => startEditing(task.id, task.text)}>Edit</button>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
