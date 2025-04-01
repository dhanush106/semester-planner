import React from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Stopwatch from "./pages/Stopwatch";
import Subjects from "./pages/Subjects";
import Subject from "./pages/Subject";
import Scheduler from "./pages/Scheduler";
import { SubjectProvider } from './context/SubjectContext';
import { TodoProvider } from './context/TodoContext';
const App = () => {
  return (
    <div>
      <SubjectProvider>
        <TodoProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subjectName" element={<Subject />} />
            <Route path= "/stopwatch" element = {<Stopwatch />} />
            <Route path="/schedule" element={<Scheduler />} />
          </Routes>
        </BrowserRouter>
        </TodoProvider>
      </SubjectProvider>
    </div>
  );
};

export default App;