import React from 'react';
import { useNavigate } from 'react-router';
import {Button} from "@mui/material";

export default function NotFound() {
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        navigate('/dashboard', { viewTransition: true });
    };

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
        </div>
    );
}
