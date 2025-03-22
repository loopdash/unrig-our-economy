// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ErrorLogs from './pages/ErrorLogs';
import Header from './components/Header';
import SearchByState from './pages/SearchByState';
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <>
        <Header/>
        <Router>
            <Routes>
                <Route path="/" 
                    element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>} 
                />
                <Route path="/search-by-state" element={<SearchByState />} />
                <Route path="/errors/get" element={<ErrorLogs />} />
            </Routes>
        </Router>
        </>
    );
}

export default App;
