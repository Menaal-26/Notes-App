// TodoList.js
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">🌟 Magical To-Do List</h1>
      <p className="todo-subtitle">Turn chaos into calm with one ✨ task ✨ at a time.</p>
      <div className="todo-input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a delightful task..."
          className="todo-input"
        />
        <button onClick={addTask} className="todo-add-btn">
          <FiPlus />
        </button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleTask(index)}>
              {task.completed ? <FiCheckCircle className="checked-icon" /> : <FiCheckCircle className="unchecked-icon" />}
              {task.text}
            </span>
            <button onClick={() => deleteTask(index)} className="todo-delete-btn">
              <FiTrash2 />
            </button>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && <p className="todo-empty">Your enchanted task garden is empty 🌱</p>}
    </div>
  );
}

export default TodoList;
