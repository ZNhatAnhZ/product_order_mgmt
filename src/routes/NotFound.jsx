import React from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/dashboard', { viewTransition: true });
    };

    return (
        <div>
            <h2>404</h2>
            <h2>Page not found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <button onClick={handleGoToDashboard}>Go to Dashboard</button>
        </div>
    );
}
