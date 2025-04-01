import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import { SubjectContext } from "../context/SubjectContext";
import { TodoProvider } from "../context/TodoContext";
import "../styles/Subject.css";

const Subject = () => {
  const context = useContext(SubjectContext);
  const { subjects } = context;
  const { subjectName } = useParams();

  return (
    <div className="subject-page">
      <div className="subjects-list">
        <h3>Your Subjects</h3>
        <ul>
          {subjects.map((sub) => (
            <li key={sub.id}  className={sub.name === subjectName ? "active" : ""}>
              <Link 
                    to={`/subjects/${encodeURIComponent(sub.name)}`}>
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="kanban-container">
        <TodoProvider subject={subjectName}>
          <KanbanBoard subject={subjectName} />
        </TodoProvider>
      </div>
    </div>
  );
};

export default Subject;