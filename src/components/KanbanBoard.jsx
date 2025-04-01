import React, { useState, useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const KanbanBoard = ({ subject }) => {
  const { tasks, addTask, updateTaskStatus, deleteTask, todoCount, inProgressCount, doneCount } =
    useContext(TodoContext);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask, "No description");
      setNewTask("");
    }
  };

  return (
    <div className="kanban-container">
      <h1>{subject} - Kanban Board</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="kanban-board">
        {["todo", "in-progress", "done"].map((status) => (
          <div key={status} className="kanban-column">
            <h3>{status.toUpperCase()}</h3>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <div key={task.id} className="kanban-task">
                  <span>{task.name}</span>
                  <p>{task.description}</p> {/* Shows the description */}
                  <div>
                    {status !== "todo" && (
                      <button onClick={() => updateTaskStatus(task.id, "todo")}>⏪</button>
                    )}
                    {status !== "done" && (
                      <button onClick={() => updateTaskStatus(task.id, "done")}>✅</button>
                    )}
                    {status !== "in-progress" && (
                      <button onClick={() => updateTaskStatus(task.id, "in-progress")}>▶️</button>
                    )}
                    <button onClick={() => deleteTask(task.id)}>❌</button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="task-counts">
        <h2>Task Counts:</h2>
        <p>Todo: {todoCount}</p>
        <p>In Progress: {inProgressCount}</p>
        <p>Done: {doneCount}</p>
      </div>
    </div>
  );
};

export default KanbanBoard;
