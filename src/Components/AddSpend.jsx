import React, { useState } from 'react';
import HomeNav from './HomeNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rereducers/authSlice';

const AddSpend = () => {
    let id= useSelector((state)=>state.auth.user.id)
    let dispatch =  useDispatch();
    let [sepndTitle, setSpendTitle] = useState()
    let [sepndrs, setSpendRs] = useState(0.0)
    let [sepndDate, setDate] = useState(new Date())

    
    const handlesbumit = async(e)=>{
        e.preventDefault()
        const spendAmount = parseFloat(sepndrs);
        const date = new Date(sepndDate);
        let object = {
            spendName:sepndTitle,
            rs: spendAmount,
            date: date.toISOString() 
        };
        try {
            let res = await axios.post("https://financeflow-production.up.railway.app/spends", object);
            console.log(res.data.data.id);
            let res1 = await axios.patch(`https://financeflow-production.up.railway.app/users/spend?uid=${id}&sid=${res.data.data.id}`, object);
            console.log(res1.data.data);
            dispatch(login(res1.data.data))
            alert("Spend Added Successfully!!")
            setDate(new Date())
            setSpendRs(0.0)
            setSpendTitle(" ")
        } catch (error) {
            console.error("Error sending data:", error);
        }
    }
   

    return (
        <>
            <HomeNav />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col mt-5">
                        <h1 className='text-center text-secondary'>My <span className='text-danger'> Spend </span></h1>
                        <form onSubmit={handlesbumit} className='text-center mt-3'>
                            <div className='form-group d-flex align-items-center flex-column mt-5'>
                                <label htmlFor="spendTitle">Spend Title </label>
                                <input value={sepndTitle} onChange={(e)=>{setSpendTitle(e.target.value)}} className='form-control text-center w-50 mt-2' type="text" name="spendTitle" id="spendTitle" />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="spendAmount">Spend RS ₹ </label>
                                <input value={sepndrs}  onChange={(e)=>{setSpendRs(e.target.value)}} className='form-control text-center w-25 mt-2' type="text" name="spendAmount" id="spendAmount" />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="spendDate">Spend Date </label>
                                <input value={sepndDate} onChange={(e)=>{setDate(e.target.value)}}  className='form-control text-center w-25 mt-2' type="date" name="spendDate" id="spendDate" />
                            </div>
                            <input className='btn btn-danger mt-3 text-light' type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="row text-center">
                <div className="col mt-3">
                    <Link to={"/viewspend"} className='btn btn-dark' > Back</Link>
                </div>
            </div>
        </div>
        </>
    );
};

export default AddSpend;
