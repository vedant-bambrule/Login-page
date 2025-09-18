import React, { useState } from "react";
import Login from "./login";
import RegisterPage from "./RegisterPage";



function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return currentPage === 'login' 
    ? <Login onPageChange={handlePageChange} /> 
    : <RegisterPage onPageChange={handlePageChange} />;
}

export default App;
