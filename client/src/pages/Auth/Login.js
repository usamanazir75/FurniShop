import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',
                { email, password }
            );
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
                window.scrollTo(0, 0);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout>
            <div className='register-container d-flex align-items-center justify-content-center'>
                <div className='register-form p-4 rounded shadow-sm'>
                    <h2 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mb-3" style={{ backgroundColor: '#f9a825', border: 'none', fontFamily: 'Poppins, sans-serif' }}>Login</button>
                        
                        {/* Styled Forgot Password Link */}
                        <div className="text-center">
                            <button type="button" className="forgot-password-link" onClick={() => navigate('/forgot-password')}>
                                Forgot Password?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login;
