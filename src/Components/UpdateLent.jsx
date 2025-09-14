import React, { useEffect, useState } from 'react'
import HomeNav from './HomeNav';
import axios from 'axios';
import { login } from '../rereducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateLent = () => {
    let { id } = useParams();
    let dispatch = useDispatch();
    let user = useSelector((state) => state.auth.user);
    let LentList = useSelector((state) => state.auth.user.lents);
    
    
    let lent = LentList.find((lent) => lent.id === parseInt(id, 10));
    
    console.log(lent);
    
    
    let [lentname, setlentName] = useState(lent ? lent.lent_name : "");
    let [toUser, setToUser] = useState(lent ? lent.toUser : "");
    let [date, setDate] = useState(lent ? lent.localDate : "");
    let [rs, setRs] = useState(lent ? lent.rs : "");
    let navigate = useNavigate()
    
    useEffect(() => {
      if(!user)
        {
            navigate("/")
        } 
      if (lent) {
            setlentName(lent.lent_name);
            setToUser(lent.toUser);
            setDate(lent.localDate);
            setRs(lent.rs);
        }
    }, [lent,user,navigate]);
    
  
  const handlesbumit = async(e)=>{
    e.preventDefault()
    const incomeAmount = parseFloat(rs);
    let object = {
      lent_name:lentname,
        rs: incomeAmount,
        localDate :date,
        toUser
    };
    try {
       let res = await axios.patch(`https://studied-territory-longest-mold.trycloudflare.com/ffb/lents?uid=${user?.id}&lid=${id}`,object)
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
                  
                  <h1 className='text-center text-secondary'>Update <span className='text-danger'> lent </span></h1>
  
                  <form onSubmit={handlesbumit} className='text-center  mt-3'>
                   
                      <div className='form-group d-flex align-items-center flex-column mt-5' >
                          <label htmlFor="spendTitle">Reason</label>
                          < input value={lentname} onChange={(e)=>{setlentName(e.target.value)}} className='form-control text-center w-50 mt-2' type="text" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                          <label htmlFor="spendTitle">Date </label>
                          < input value={date} onChange={(e)=>{setDate(e.target.value)}} className='form-control text-center w-25 mt-2' type="date" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                          <label htmlFor="spendTitle">lent RS ₹ </label>
                          < input value={rs} onChange={(e)=>{setRs(e.target.value)}} className='form-control text-center w-25 mt-2' type="text" name="pendTitle" id="pendTitle" />
                      </div>
                      <div className='form-group d-flex align-items-center flex-column mt-4' >
                      <label htmlFor="t">To </label>
                         <input type="text" value={toUser}  onChange={(e)=>{setToUser(e.target.value)}}  className='form-control text-center w-25' placeholder='Enter User details who gives you lent else other  ' />
                       
                      </div>

                      
                      <input className='btn btn-danger mt-3 text-light' type="submit" value="submit" />
                  </form>
                   </div>
          </div>
        </div>
        <div className="container">
        <div className="row">
          <div className="col text-center">
            <Link className='btn btn-dark mt-3' to={"/viewlent"} >back</Link>
          </div>
        </div>
      </div>
      </>
    )

}

export default UpdateLent