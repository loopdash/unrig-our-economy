// client/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ErrorLogs from "./pages/ErrorLogs";
import Header from "./components/Header";
import SearchByState from "./pages/SearchByState";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";
import PerState from "./pages/PerState";
import SearchByStateWithFred from "./pages/SearchByStateWithFred";

function App() {
  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/search-by-state" element={<SearchByState />} />
          <Route path="/per-state" element={<PerState />} />
          <Route
            path="/search-by-state-fred"
            element={<SearchByStateWithFred />}
          />
          <Route path="/errors/get" element={<ErrorLogs />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
