import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Subjects.css";
import { SubjectContext } from "../context/SubjectContext";
import { TodoContext } from "../context/TodoContext";

const Subjects = () => {
  const { subjects, addSubject, deleteSubject } = useContext(SubjectContext);
  const { deleteTasksBySubject } = useContext(TodoContext);
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddSubject = () => {
    if (subjectName.trim() && description.trim()) {
      addSubject(subjectName, description);
      setSubjectName("");
      setDescription("");
    }
  };

  const handleDeleteSubject = async (id, subjectName, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm("Are you sure you want to delete this subject and all its tasks?")) {
      await deleteTasksBySubject(subjectName);
      deleteSubject(id);
    }
  };

  return (
    <div className="subjects-container">
      <h2>Manage Subjects</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>
      <ul className="subject-list">
        {subjects.length === 0 ? (
          <p>No subjects available. Please add a subject.</p>
        ) : (
          subjects.map((subject) => (
            <Link className="s" to={`/subjects/${encodeURIComponent(subject.name)}`} key={subject.id}>
              <li>
                <div className="subject-content">
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                </div>
                <button 
                  className="delete-btn"
                  onClick={(e) => handleDeleteSubject(subject.id, subject.name, e)}
                  title="Delete subject and all its tasks"
                >
                  ×
                </button>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default Subjects;