import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [loadingWarn,setLoadingWarn] = useState(false);

    const formSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (password !== confirmpass) {
            // alert("Your password does not match the confirm password");
            setLoadingWarn(true)
            setLoading(false)
        }
        else{
            setLoadingWarn(false)
        const signupObject = { email, password: confirmpass, name, mobile };
        try {
            const res = await axios.post('https://studied-territory-longest-mold.trycloudflare.com/ffb/users', signupObject);
            if (res.data && res.data.statusCode === 201) {
                alert("SignUp successfully!");
                navigate(`/`);
            }
        } catch (error) {
            console.error('Signup error', error);
            alert(error);
        }finally{
            setLoading(false)
        }}
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid p-0 m-0 mt-4" style={{ minHeight: "80vh" }}>
                <div className="row">
                    <div className="col-12 col-md-5 d-flex justify-content-center align-items-center flex-column p-3">
                        <h1 className='text-center'>Sign Up and Manage Your Finances</h1>
                        <p >
                            <h5 className='text-danger my-2 text-center '> Keep your password safe and never share it with anyone. If you lose your password, it cannot be recovered*.</h5>
                        </p>
                    </div>
                  { loadingWarn?<p className='text-center text-light bg-dark' >Your password does not match the confirm password</p>:""}
                    <div className="col-12  col-md-6 d-flex justify-content-center align-items-center ">
                        <div className='  bg-light p-4 text-center rounded-3 w-50 '>
                            <form onSubmit={formSubmit}>
                                <div className="form-group my-1">
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className='form-control' type="text" name="name" id="name" placeholder='Enter your name' required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="email" className='form-label'>Email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' type="email" name="email" id="email" placeholder='Enter your email' required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="mobile" className='form-label'>Mobile</label>
                                    <input value={mobile} onChange={(e) => {setMobile(e.target.value); e.target.style.outline = e.target.value.length!==10?"2px solid red":"none"}} className='form-control' type="tel" name="mobile" id="mobile" placeholder='Phone No' required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="password" className='form-label'>Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' type="password" name="password" id="password" placeholder='Enter your password' required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                                    <input required value={confirmpass} onChange={(e) => {setConfirmPassword(e.target.value); e.target.style.outline =password !== e.target.value? "2px solid red":"none" }  } className='form-control' type="password" name="confirm" id="confirmPassword" placeholder='Confirm password' />
                                </div>
                                <div className="form-group text-center my-3 d-flex justify-content-between">
                                    <button type="submit"  className='btn btn-primary'>{loading? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>: "SignUp"} </button> 
                                    <button type="button" className='btn btn-danger' onClick={() => { setName(''); setEmail(''); setPassword(''); setConfirmPassword(''); setMobile(''); }}>Clear</button>
                                </div>
                                <Link className='text-center' to={"/"}>I already have an account</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
