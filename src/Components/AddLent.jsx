import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rereducers/authSlice';
import HomeNav from './HomeNav';
import { Link } from 'react-router-dom';

const AddLent = () => {
  let dispatch = useDispatch()
  let id = useSelector((state)=>state.auth.user.id)
  let [lent_name, setLentName] = useState(" ");
  let [toUser, setToUser] = useState();
  let [date, setDate] = useState(new Date());
  let [rs, setRs] = useState(0.0);

  document.title="financeFlow - Add Borrow "

const handlesbumit = async(e)=>{
  e.preventDefault()
  const incomeAmount = parseFloat(rs);
  let object = {
    lent_name,
      rs: incomeAmount,
      localDate :date,
      toUser
  };
  try {
      let res = await axios.post("https://studied-territory-longest-mold.trycloudflare.com/ffb/lent", object);
      console.log(res.data.data.id);
      let res1 = await axios.patch(`https://studied-territory-longest-mold.trycloudflare.com/ffb/user/lent?uid=${id}&lid=${res.data.data.id}`, object);
      console.log(res1.data.data);
      dispatch(login(res1.data.data))
      alert("Lent Added Successfully!!")
      setRs(0.0)
      setLentName(" ")
      
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
                
                <h1 className='text-center text-secondary'>Add <span className='text-danger'> Lent </span></h1>

                <form onSubmit={handlesbumit} className='text-center  mt-3'>
                 
                    <div className='form-group d-flex align-items-center flex-column mt-5' >
                        <label htmlFor="spendTitle">Reason</label>
                        < input value={lent_name} onChange={(e)=>{setLentName(e.target.value)}} className='form-control text-center w-50 mt-2' type="text" name="pendTitle" id="pendTitle" />
                    </div>
                    <div className='form-group d-flex align-items-center flex-column mt-4' >
                        <label htmlFor="spendTitle">Date </label>
                        < input value={date} onChange={(e)=>{setDate(e.target.value)}} className='form-control text-center w-25 mt-2' type="date" name="pendTitle" id="pendTitle" />
                    </div>
                    <div className='form-group d-flex align-items-center flex-column mt-4' >
                        <label htmlFor="spendTitle">RS ₹ </label>
                        < input value={rs} onChange={(e)=>{setRs(e.target.value)}} className='form-control text-center w-25 mt-2' type="text" name="pendTitle" id="pendTitle" />
                    </div>
                    <div className='form-group d-flex align-items-center flex-column mt-4' >
                    <label htmlFor="t">To</label>
                       <input type="text" value={toUser}  onChange={(e)=>{setToUser(e.target.value)}}  className='form-control w-25' placeholder='Enter User details who gives you borrow else other  ' />
                     
                    </div>

                    
                    <input className='btn btn-danger mt-3 text-light' type="submit" value="submit" />
                </form>
                 </div>
                 
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center mt-4">
            <Link to={"/viewlent"} className='btn btn-dark' > back </Link>
          </div>
        </div>
      </div>
    </>
  )
}


export default AddLent
