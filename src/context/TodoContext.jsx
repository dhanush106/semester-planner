import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children, subject }) => {
  // Initialize tasks as an array and ensure it's always an array
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (!storedTasks) return [];
      
      const parsedTasks = JSON.parse(storedTasks);
      // Additional check to ensure parsed data is an array
      return Array.isArray(parsedTasks) ? parsedTasks : [];
    } catch (error) {
      console.error("Error reading tasks from localStorage:", error);
      return []; // Always return an array as fallback
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const addTask = (name, description) => {
    if (!name || !description) return;
    
    setTasks(prevTasks => {
      const newTask = {
        id: Date.now(),
        name: String(name),
        description: String(description),
        status: "todo",
        subject: subject || "default",
      };
      return Array.isArray(prevTasks) ? [...prevTasks, newTask] : [newTask];
    });
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prevTasks => {
      if (!Array.isArray(prevTasks)) return [];
      return prevTasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      );
    });
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => {
      if (!Array.isArray(prevTasks)) return [];
      return prevTasks.filter(task => task.id !== id);
    });
  };

  // Add this to your existing TodoContext provider
const deleteTasksBySubject = (subjectName) => {
  setTasks(prevTasks => {
    if (!Array.isArray(prevTasks)) return [];
    return prevTasks.filter(task => task.subject !== subjectName);
  });
};

// Add deleteTasksBySubject to the context value

  const getTasksBySubject = (subjectName) => {
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(task => task.subject === subjectName);
  };

  // Calculate counts safely
  const calculateCount = (status) => {
    if (!Array.isArray(tasks)) return 0;
    return tasks.filter(task => 
      task.status === status && (!subject || task.subject === subject)
    ).length;
  };

  const filteredTasks = Array.isArray(tasks)
    ? (subject ? tasks.filter(task => task.subject === subject) : tasks)
    : [];

  const value = {
    tasks: filteredTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    getTasksBySubject,
    todoCount: calculateCount("todo"),
    inProgressCount: calculateCount("in-progress"),
    doneCount: calculateCount("done"),
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};