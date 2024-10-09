import React, { useState } from 'react'
import HomeNav from './HomeNav'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../rereducers/authSlice'

const AddIncome = () => {

  let dispatch = useDispatch()
  let id = useSelector((state)=>state.auth.user.id)
  let [income_name, setIncomeName] = useState(" ");
  let [date, setIncomeType] = useState(new Date());
  let [rs, setRs] = useState(0.0);



const handlesbumit = async(e)=>{
  e.preventDefault()
  const incomeAmount = parseFloat(rs);
  let object = {
      income_name,
      rs: incomeAmount,
      date
  };
  try {
      let res = await axios.post("https://financeflow-production.up.railway.app/income", object);
      console.log(res.data.data.id);
      let res1 = await axios.patch(`https://financeflow-production.up.railway.app/users/income?uid=${id}&iid=${res.data.data.id}`, object);
      console.log(res1.data.data);
      dispatch(login(res1.data.data))
      alert("Income Added Successfully!!")
      setRs(0.0)
      setIncomeName(" ")
      setIncomeType(" ")
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
                
                <h1 className='text-center text-secondary'>My <span className='text-danger'> Income </span></h1>

                <form onSubmit={handlesbumit} className='text-center  mt-3'>
                 
                    <div className='form-group d-flex align-items-center flex-column mt-5' >
                        <label htmlFor="spendTitle">Income Name </label>
                        < input value={income_name} onChange={(e)=>{setIncomeName(e.target.value)}} className='form-control text-center w-50 mt-2' type="text" name="pendTitle" id="pendTitle" />
                    </div>
                    <div className='form-group d-flex align-items-center flex-column mt-4' >
                        <label htmlFor="spendTitle">Date </label>
                        < input value={date} onChange={(e)=>{setIncomeType(e.target.value)}} className='form-control text-center w-25 mt-2' type="date" name="pendTitle" id="pendTitle" />
                    </div>
                    <div className='form-group d-flex align-items-center flex-column mt-4' >
                        <label htmlFor="spendTitle">Income RS ₹ </label>
                        < input value={rs} onChange={(e)=>{setRs(e.target.value)}} className='form-control text-center w-25 mt-2' type="text" name="pendTitle" id="pendTitle" />
                    </div>
                    
                    <input className='btn btn-danger mt-3 text-light' type="submit" value="Submit" />
                </form>
                 </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <Link className='btn btn-dark mt-3' to={"/viewincome"} >Back</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddIncome
