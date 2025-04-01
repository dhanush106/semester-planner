import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Scheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || {};
  });
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addTask = () => {
    if (!taskInput.trim()) return;
    const dateKey = selectedDate.toDateString();
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), taskInput],
    }));
    setTaskInput("");
  };

  const removeTask = (index) => {
    const dateKey = selectedDate.toDateString();
    const updatedTasks = tasks[dateKey].filter((_, i) => i !== index);
    setTasks((prev) => ({ ...prev, [dateKey]: updatedTasks }));
  };

  return (
    <div className="todo-calendar-container">
      <h2>Calendar To-Do List</h2>
      <Calendar onChange={handleDateChange} value={selectedDate} />
      <h3>Tasks for {selectedDate.toDateString()}</h3>
      <div className="task-input">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {(tasks[selectedDate.toDateString()] || []).map((task, index) => (
          <li key={index}>
            {task} <button onClick={() => removeTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scheduler;