import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HomeNav from './HomeNav';
import { login } from '../rereducers/authSlice';
import { Link } from 'react-router-dom';

const AddBorrow = () => {
    let dispatch = useDispatch()
    let id = useSelector((state)=>state.auth.user.id)
    let [borrowname, setBorrowName] = useState(" ");
    let [from_user, setFromUser] = useState();
    let [date, setDate] = useState(new Date());
    let [rs, setRs] = useState(0.0);

    document.title="financeFlow - Add Borrow "
  
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
        let res = await axios.post("https://financeflow-production.up.railway.app/borrow", object);
        console.log(res.data.data.id);
        let res1 = await axios.patch(`https://financeflow-production.up.railway.app/user/borrow?uid=${id}&bid=${res.data.data.id}`, object);
        console.log(res1.data.data);
        dispatch(login(res1.data.data))
        alert("Borrow Added Successfully!!!")
        setRs(0.0)
        setBorrowName(" ")
        
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
                  
                  <h1 className='text-center text-secondary'>Add <span className='text-danger'> Borrow </span></h1>
  
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
                      <label htmlFor="t">From  </label>
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
  

export default AddBorrow
