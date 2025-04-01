import { createContext, useState, useEffect } from "react";

// Create Context
export const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("subjects")) || [];
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = (name, description) => {
    if (name.trim() && description.trim()) {
      setSubjects([...subjects, { id: Date.now(), name, description }]);
    }
  };

  const deleteSubject = (name, description) => {
    const filteredSubjects = subjects.filter(
      (subject) => subject.name!== name && subject.description!== description
    );
    setSubjects(filteredSubjects);
  }

  return (
    <SubjectContext.Provider value={{ subjects, addSubject, deleteSubject }}>
      {children} {/* ✅ Makes subjects available everywhere */}
    </SubjectContext.Provider>
  );
};
