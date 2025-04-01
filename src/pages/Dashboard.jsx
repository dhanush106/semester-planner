import React, { useContext } from 'react';
import { SubjectContext } from '../context/SubjectContext';
import { TodoContext } from '../context/TodoContext';
import Chart from '../components/Chart';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { subjects } = useContext(SubjectContext);
  const todoContext = useContext(TodoContext);
  
  // Safely destructure with defaults
  const { getTasksBySubject = () => [] } = todoContext || {};

  return (
    <div className="dashboard-container">
      <h1>Task Distribution Dashboard</h1>
      <div className="charts-grid">
        {subjects.map(subject => {
          const subjectTasks = getTasksBySubject(subject.name);
          const counts = {
            todo: subjectTasks.filter(t => t.status === 'todo').length,
            inProgress: subjectTasks.filter(t => t.status === 'in-progress').length,
            done: subjectTasks.filter(t => t.status === 'done').length
          };

          return (
            <div key={subject.id} className="chart-card">
              <h3>{subject.name}</h3>
              <Chart 
                todoCount={counts.todo}
                inProgressCount={counts.inProgress}
                doneCount={counts.done}
              />
              <div className="task-summary">
                <span>Total: {subjectTasks.length}</span>
                <span>Todo: {counts.todo}</span>
                <span>In Progress: {counts.inProgress}</span>
                <span>Done: {counts.done}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;