// TodoList.js
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
 const [tasks, setTasks] = useState([]);
 const [newTask, setNewTask] = useState("");
 const [darkMode, setDarkMode] = useState(false);
 const [language, setLanguage] = useState("en");

 const handleAddTask = () => {
 if (newTask.trim()) {
  setTasks([...tasks, { id: tasks.length + 1, name: newTask, done: false }]);
  setNewTask('');
 }
 };

 const handleToggleMode = () => {
 setDarkMode(!darkMode);
 };

 const handleLanguageChange = (event) => {
 setLanguage(event.target.value);
 };

 const handleEditTask = (taskId) => {
 const task = tasks.find((task) => task.id === taskId);
 // Implement your edit task logic here
 };

 const handleArchiveTask = (taskId) => {
 setTasks(tasks.filter((task) => task.id !== taskId));
 };

 // ... rest of your code
};

export default TodoList;
