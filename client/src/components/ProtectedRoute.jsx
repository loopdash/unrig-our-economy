// client/src/components/ProtectedRoute.js
import React, { useState, useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('isAuthorized');
        if (stored === 'true') setIsAuthorized(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'ShapeTomorrow') {
            setIsAuthorized(true);
            localStorage.setItem('isAuthorized', 'true');
        } else {
            alert('Incorrect password');
        }
    };

    if (isAuthorized) return children;

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Enter Password to View This Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ProtectedRoute;
