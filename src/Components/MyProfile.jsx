import React, { useEffect, useState } from 'react'
import HomeNav from './HomeNav'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../rereducers/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

const MyProfile = () => {
    let  user = useSelector((state)=>state.auth.user);
    let [name, setName] = useState(user?.name||'');
    let [email, setEmail] = useState(user?.email||'');
    let [mobile,setMobile] = useState(user?.mobile||0);
    let [password,setPassword] = useState("");
    let dispatch = useDispatch()
    let navigate = useNavigate()
    
    useEffect(()=>{
       document.title="financeFlow - My Profile "
        if(!user)
        {
            navigate("/")
        }
    },[navigate,user])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let object ={
            name,email,mobile
        }
        try{
        let res = await axios.patch(`https://studied-territory-longest-mold.trycloudflare.com/ffb/user?uid=${user?.id}`,object)
        dispatch(login(res.data.data))
        alert(res.data.message)
        }
        catch(error)
        {
            console.log(error)
        }

    }
    const deletehandle = async()=>{
       // eslint-disable-next-line no-restricted-globals
        const isConfirmed = confirm("Are you sure? You will lose all your data, which is not restorable.");
        
    if (isConfirmed) {
        await axios.delete(`https://studied-territory-longest-mold.trycloudflare.com/ffb/users/${user?.id}`) 
        alert("you no longer user of FinanceFlow")
        navigate("/");
    } else {
        // If the user clicks "Cancel", do nothing or provide feedback
        console.log("Action canceled");
    }
    }

  return (
    <>
    <HomeNav/>
    <div className="container " style={{maxHeight:"150vh", minHeight:"80vh"}}>
        <div className="row " style={{maxHeight:"150vh", minHeight:"80vh"}} >
            <div className="col-12 col-md-6 mt-3  text-center d-flex  align-items-center justify-content-center flex-column">
               
               <div className='border rounded-circle bg-danger text-light bo p-5 d-flex justify-content-center align-items-center ' style={{width:"300px",height:"300px"}} > <h1 style={{fontSize:"100px"}}> {name[0]?.toUpperCase()} </h1></div>
               {/* <div className='  text-light bo p-5 d-flex justify-content-center align-items-center ' style={{width:"400px",height:"20px"}} > <button  onClick={()=>{deletehandle()}} className=' mt-5 me-5 text-center btn btn-danger'  >delete My Account</button></div> */}
               <button className='my-3 btn btn-danger' onClick={()=>{deletehandle()}} >Delete My Account</button>
             
            </div>
            <div className="col-12 col-md-6 my-3">
            <form action=""  onSubmit={handleSubmit} >
                <div className="form-group  text-center my-1">
                    <label htmlFor="name" className='form-label text-center'>Name</label>
                    <input  value={name} onChange={(e)=>{setName(e.target.value)}} className='form-control text-center mx-auto w-50 ' type="text" name="name" id="name" placeholder='Enter your name' />
                </div>
                <div className="form-group  text-center my-3">
                    <label htmlFor="email" className='form-label text-center'>Email</label>
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  className='form-control  text-center mx-auto w-50 '  type="email" name="email" id="email" placeholder='Enter your email' />
                </div>
                <div className="form-group  text-center my-3">
                    <label htmlFor="mobile" className='form-label text-center'>Mobile</label>
                    <input value={mobile} onChange={(e)=>{setMobile(e.target.value); e.target.style.outline = e.target.value.length !== 10?"2px solid red":"none"}} className='form-control  text-center mx-auto w-50 '  type="number" name="mobile" id="mobile" placeholder='Phone No' />
                </div>
                <div className="form-group  text-center my-3">
                    <label htmlFor="password" className='form-label text-center'>Password</label>
                    <input disabled value={password} onChange={(e)=>{setPassword(e.target.value)}}  className='form-control text-center mx-auto w-50  '  type="password" name="password" id="password" placeholder='Enter your password' />
                </div>
                <div className="form-group  text-center my-3">
                    <label htmlFor="confirm password" className='form-label text-center'>Confirm Password</label>
                    <input disabled  className='form-control  text-center mx-auto w-50 '  type="password" name="confirm" id="confirm" placeholder='Confirm password' />
                </div>
                <div className="form-group text-center my-3 d-flex justify-content-evenly">
                   <input type="submit" value="Save Changes" className='btn btn-primary my-2' />
                   <button onClick={()=>{dispatch(logout());navigate("/");alert("logout sucessfull")}} className='btn btn-dark my-2' >Logout</button>
                </div>
            </form>
           
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default MyProfile