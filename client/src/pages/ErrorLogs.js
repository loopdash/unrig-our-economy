// client/src/pages/ErrorLogs.js
import React, { useEffect, useState } from 'react';
import { getErrorLogs } from '../services/api';

function ErrorLogs() {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchErrors = async () => {
            try {
                const data = await getErrorLogs();
                setErrors(data);
            } catch (error) {
                console.error('Failed to fetch error logs:', error);
            }
        };
        fetchErrors();
    }, []);

    return (
        <div>
            <h1>Error Logs</h1>
            <ul>
                {errors.map((error) => (
                    <li key={error.id}>{error.error_message} - {error.occurred_at}</li>
                ))}
            </ul>
        </div>
    );
}

export default ErrorLogs;
