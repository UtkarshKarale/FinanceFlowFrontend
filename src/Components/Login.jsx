import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../rereducers/authSlice';
import Footer from './Footer';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let dispatch = useDispatch();
   
  
    const navigate = useNavigate(); 
    let [loading ,setLoading] = useState(false);

    document.title = "FinanceFlow Sign Up"
    const formSubmit = async (e) => {
       
        setLoading(true)
        e.preventDefault();
        console.log(email, password);
        let loginobject = { email, password };
        try {
            let res = await axios.post('https://financeflow-production.up.railway.app/user/login', loginobject);
            console.log(res.data);
            dispatch(login(res.data.data))
            alert(`${res.data.message}`)
            if (res.data && res.data.statusCode === 302) {
                navigate(`/home`); 
            }
        } catch (error) {
           
            console.error('Login error', error);
        }finally{
            setLoading(false)
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center flex-md-row  p-0 m-0 mt-4" style={{ maxHeight: "100vh", minHeight: "80vh" }}>
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center flex-column m-1">
        <h4 className='px-5 text-center'>One Step Ahead in Managing Your Finances. Log In Now</h4>
        <p className='p-2 text-secondary'>Unlock the Flow of Your Financial Future.</p>
    </div>
    <div className="col-12 col-md-6 p-2 m-1 d-flex flex-column align-items-center justify-content-center">
        <div className='bg-light p-5 rounded-3'>
            <form onSubmit={formSubmit}>
                <h5 className='text-center'>Log<span className='text-danger'>In</span></h5>
                <div className="form-group text-center my-3">
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Enter your email' />
                </div>
                <div className="form-group text-center my-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <input className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder='Enter your password' />
                </div>
                <div className="form-group text-center my-3 d-flex justify-content-between">
                    <button type="submit" value="Login" className='btn btn-primary' > {loading? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>: "Login"} </button>
                    <button className='btn btn-danger' type='button' onClick={() => { setEmail(''); setPassword(''); }}>Clear</button>
                </div>
                <Link to="/signup">I don't have an account?</Link>
            </form>
        </div>
    </div>
        
</div>
<Footer/>
        </>
    );
};

export default Login;
