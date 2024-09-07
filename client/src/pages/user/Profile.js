import React,{useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  //context
  const [auth,setAuth] = useAuth()

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

    // get user data
    useEffect(() => {
      if (auth?.user) {
        const { email = '', name = '', phone = '', address = '' } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      }
    }, [auth?.user]);

    // Form submit handler
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.put('/api/v1/auth/profile', { 
          name,
          email,
          password,
          phone,
          address,
          
        });
       if(data?.error){
        toast.error(data?.error)
       }else{
        setAuth({...auth, user:data?.user})
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data?.user
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success('Profile updated successfully');
       }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };
  return (
    <Layout>
      <div className="container-fluid px-3 py-4" style={{ marginTop: '10px' }}> {/* Added marginTop to prevent overlap with header */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div
              className="profile-content card p-4"
              style={{
                margin: '0 auto', // Center the content horizontally
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Subtle shadow
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
             <div className='register-container-style d-flex align-items-center justify-content-center'>
        <div className='register-form p-4 rounded shadow-sm ' style={{textAlign:'left'}}>
          <h2 className='text-center mb-4' style={{ fontFamily: 'Playfair Display, serif', color: '#f9a825' }}>User Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'  disabled value={email} onChange={(e) => setEmail(e.target.value)} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password'  value={password} onChange={(e) => setPassword(e.target.value)} />
            </div> 
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" id="phone" placeholder='Enter your phone number'  value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <textarea className="form-control" id="address" rows="3" placeholder='Enter your address'  value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn btn-warning w-100" style={{ backgroundColor: '#f9a825', border: 'none', fontFamily: 'Poppins, sans-serif' }}>Update</button>
          </form>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
