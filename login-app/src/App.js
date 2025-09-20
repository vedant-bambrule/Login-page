import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Login from "./login";
import RegisterPage from "./RegisterPage";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner component
  }

  if (user) {
    // User is logged in, show logged-in page here or redirect
    return (
      <div>
        <h1>Welcome, {user.email}</h1>
        <button onClick={() => auth.signOut()}>Logout</button>
        {/* TODO: Render dashboard or protected route here */}
      </div>
    );
  }

  // User not logged in: show login or register page
  return currentPage === "login" ? (
    <Login onPageChange={handlePageChange} />
  ) : (
    <RegisterPage onPageChange={handlePageChange} />
  );
}

export default App;
