import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevValue => --prevValue);
        }, 1000);
        if (count === 0) navigate(`/${path}`,{
            state: location.pathname,
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    return (
        <>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>
                Redirecting you in {count} seconds
            </h1>
            <div className="spinner-border" role="status" style={{
                width: '3rem',
                height: '3rem',
                borderWidth: '0.4em',
                borderColor: '#f9a825 transparent #f9a825 transparent',
                animation: 'spinner-border 1.5s linear infinite'
            }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </> 
    );
};

export default Spinner;
