import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import purrrLogo from "./purrr.png";

const TodoList = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [taskCategories, setTaskCategories] = useState(["school", "personal"]);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const handleEditTaskSubmit = () => {
    if (editTask.trim()) {
      setTasks(tasks.map((task) => (task.id === editTaskId ? { ...task, name: editTask } : task)));
      setEditTask('');
      setEditTaskId(null);
    }
  };

  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleToggleDone = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            done: !task.done,
            createdAt: task.done ? undefined : new Date().toLocaleDateString(),
            dueDate: task.done ? undefined : task.dueDate,
            priority: task.done ? undefined : task.priority,
          }
        : task
    );

    const completedTask = updatedTasks.find((task) => task.id === taskId);

    if (completedTask && completedTask.done) {
      setCompletedTasks([...completedTasks, completedTask]);
      setTasks(updatedTasks.filter((task) => task.id !== taskId));
    } else {
      setTasks(updatedTasks);
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    }

    // Set text color to black for completed tasks
    const completedTaskElement = document.getElementById(`task-${taskId}`);
    if (completedTaskElement) {
      completedTaskElement.style.color = completedTask && completedTask.done ? 'black' : 'inherit';
    }
  };

  const handleEditTaskClick = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditTask(task.name);
    setEditTaskId(taskId);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObject = {
        id: tasks.length + 1,
        name: newTask,
        done: false,
        category: taskCategories[0],
        dueDate: dueDate,
        priority: priority,
        createdAt: new Date().toLocaleDateString(),
        icon: "🐱", // Cat icon
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');
      setDueDate('');
      setPriority('low');
    }
  };

  const handleLogin = () => {
    // Implement your login logic here
    // For simplicity, consider using hard-coded credentials
    const adminUsername = 'admin';
    const adminPassword = '12345';
  
    if (loginUsername === adminUsername && loginPassword === adminPassword) {
      setUser({ username: loginUsername });
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case 'low':
        return '#ffd7b5'; // Light Apricot
      case 'medium':
        return '#ffb38a'; // Light Salmon
      case 'high':
        return '#ff9248'; // Atomic Tangerine
      default:
        return '#ffd7b5'; // Default to low priority color
    }
  };

  const getDaysRemaining = (dueDate) => {
    if (!dueDate) return null;

    const today = new Date();
    const due = new Date(dueDate);
    const timeDifference = due.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysRemaining;
  };

  const sortTasksByName = () => {
    setTasks([...tasks.sort((a, b) => a.name.localeCompare(b.name))]);
  };

  const handleArchiveTasks = () => {
    setCompletedTasks([]);
  };

  // Calculate completion rate
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className={`todo-app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="app-container">
        <div className="logo-container">
          <img src={purrrLogo} alt="Purrr Logo" className="logo" />
        </div>
        
        <div className="toggle-mode">
          <div className="oblong-container">
            <button className={`dark-mode-button ${darkMode ? 'active' : ''}`} onClick={handleToggleMode}>
              <i className="fas fa-moon"></i>
            </button>
            <button className={`light-mode-button ${!darkMode ? 'active' : ''}`} onClick={handleToggleMode}>
              <i className="fas fa-sun"></i>
            </button>
          </div>
        </div>
        
        {user ? (
          <>
            <h1>
              {language === 'en'
                ? 'Todo List'
                : language === 'ph'
                ? 'Listahan ng Gawain'
                : language === 'bisaya'
                ? 'Listahan sa Buhatonon'
                : language === 'maranao'
                ? 'Kataya o task'
                : 'Unknown Language'}
            </h1>
            <div className="controls">
              <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option>
                <option value="ph">Tagalog</option>
                <option value="bisaya">Bisaya</option>
                <option value="maranao">Maranao</option>
              </select>
              <button onClick={sortTasksByName}>Sort by Name</button>
            </div>
            <div className="add-task">
              <input
                type="text"
                placeholder={language === 'en' ? 'Enter task...' : 'Magdagdag ng gawain...'}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <select value={taskCategories[0]} onChange={(e) => setTaskCategories([e.target.value])}>
                {taskCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="date"
                placeholder={language === 'en' ? 'Due date...' : 'Petsa ng deadline...'}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={handleAddTask}>
                {language === 'en' ? 'Add Task' : 'Magdagdag ng Gawain'}
              </button>
            </div>
            <div className="task-list">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="tasks">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <li
                              id={`task-${task.id}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className={`task ${task.done ? 'done' : ''}`}
                                style={{ backgroundColor: task.done ? 'lightgreen' : getPriorityColor() }}
                              >
                                <input
                                  type="checkbox"
                                  checked={task.done}
                                  onChange={() => handleToggleDone(task.id)}
                                />
                                <label
                                  style={{
                                    textDecoration: task.done ? 'line-through' : 'none',
                                    color: task.done ? 'black' : 'inherit',
                                  }}
                                >
                                  {task.icon && <span>{task.icon}</span>} {task.name}
                                </label>
                                {task.done ? null : (
                                  <>
                                    <p>Created: {task.createdAt}</p>
                                    {task.dueDate && (
                                      <p>Days Remaining: {getDaysRemaining(task.dueDate)}</p>
                                    )}
                                  </>
                                )}
                              </div>
                              <div className="actions">
                                <button onClick={() => handleEditTaskClick(task.id)}>
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleDeleteTask(task.id)}>
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            
            <div className="completion-archive-box">
              {completedTasks.length > 0 && (
                <div className="completed-tasks-box">
                  <div className="curved-box">
                    <h2>Completed Tasks</h2>
                    <div className="completed-tasks">
                      <ul>
                        {completedTasks.map((task) => (
                          <li key={task.id}>{task.name}</li>
                        ))}
                      </ul>
                      <button className="archive-button" onClick={handleArchiveTasks}>
                        Archive All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="task-statistics">
              <h2>Task Completion Statistics</h2>
              <p>Total Tasks: {tasks.length}</p>
              <p>Completed Tasks: {completedTasks.length}</p>
              <p>Completion Rate: {completionRate.toFixed(2)}%</p>
            </div>

            {editTaskId !== null && (
              <div className="edit-task">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Edit task...' : 'I-edit ang gawain...'}
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={handleEditTaskSubmit}>
                  {language === 'en' ? 'Save Task' : 'I-save ang Gawain'}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="login-form">
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
