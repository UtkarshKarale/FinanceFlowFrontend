import React, { useEffect, useState } from 'react'
import HomeNav from './HomeNav';
import axios from 'axios';
import { login } from '../rereducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateBorrow = () => {

    let { id } = useParams();
    let dispatch = useDispatch();
    let user = useSelector((state) => state.auth.user);
    let borrowslist = useSelector((state) => state.auth.user.borrowslist);
    
    // Find the specific borrow object based on id (ensure id is the same type, usually string from useParams)
    let borrow = borrowslist.find((borrow) => borrow.id === parseInt(id, 10));
    
    console.log(borrow);
    
    // Initialize state based on borrow object (if it exists)
    let [borrowname, setBorrowName] = useState(borrow ? borrow.borrow_name : "");
    let [from_user, setFromUser] = useState(borrow ? borrow.from_user : "");
    let [date, setDate] = useState(borrow ? borrow.localDate : "");
    let [rs, setRs] = useState(borrow ? borrow.rs : "");
    let navigate = useNavigate()
    // Optional: Use useEffect to update state if `borrow` changes (if necessary)
    useEffect(() => {
      if(!user)
        {
            navigate("/")
        }   
      if (borrow) {
            setBorrowName(borrow.borrow_name);
            setFromUser(borrow.from_user);
            setDate(borrow.localDate);
            setRs(borrow.rs);
        }
    }, [borrow,navigate,user]);
    
  
  const handlesbumit = async(e)=>{
    e.preventDefault()
    const incomeAmount = parseFloat(rs);
    let object = {
      borrow_name:borrowname,
        rs: incomeAmount,
        localDate :date,
        from_user
    };
    try {
       let res = await axios.patch(`https://financeflow-production.up.railway.app/borrow?uid=${user?.id}&bid=${id}`,object)
        console.log(res.data.data);
        dispatch(login(res.data.data))
        alert("data is updated")
        
        
    } catch (error) {
        console.error("Error sending data:", error);
    }
  }


  
    return (
      <>
         <HomeNav/>
        <div className="container">
          <div className="row d-flex justify-content-center">
              <div className="col mt-5 ">
                  
                  <h1 className='text-center text-secondary'>Update <span className='text-danger'> Borrow </span></h1>
  
                  <form onSubmit={handlesbumit} className='text-center  mt-3'>
                   
                      <div className='form-group d-flex align-items-center flex-column mt-5' >
                          <label htmlFor="spendTitle">Reason</label>
                          < input value={borrowname} onChange={(e)=>{setBorrowName(e.target.value)}} className='form-control text-center w-50 mt-2' type="text" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                          <label htmlFor="spendTitle">Date </label>
                          < input value={date} onChange={(e)=>{setDate(e.target.value)}} className='form-control text-center w-25 mt-2' type="date" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                          <label htmlFor="spendTitle">Borrow RS ₹ </label>
                          < input value={rs} onChange={(e)=>{setRs(e.target.value)}} className='form-control text-center w-25 mt-2' type="text" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                      <label htmlFor="t">From </label>
                         <input type="text" value={from_user}  onChange={(e)=>{setFromUser(e.target.value)}}  className='form-control w-25' placeholder='Enter User details who gives you borrow else other  ' />
                       
                      </div>

                      
                      <input className='btn btn-danger mt-3 text-light' type="submit" value="submit" />
                  </form>
                   </div>
          </div>
        </div>
        <div className="container">
        <div className="row">
          <div className="col text-center">
            <Link className='btn btn-dark mt-3' to={"/viewborrow"} >back</Link>
          </div>
        </div>
      </div>
      </>
    )
}

export default UpdateBorrow