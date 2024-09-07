import React, { useState } from 'react';
import Layout from "./../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', 
                { email, newPassword, answer } 
            );
            if (res && res.data.success) {
                toast.success(res.data.message);
             
                navigate("/login");
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
                    <h2 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>Reset Password</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter new password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                             <label htmlFor="answer" className="form-label">Answer</label>
                             <input type="text" className="form-control" id="answer" placeholder='Enter your childhood nickname'  required value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-warning w-100 mb-3" style={{ backgroundColor: '#f9a825', border: 'none', fontFamily: 'Poppins, sans-serif' }}>Reset</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword;
