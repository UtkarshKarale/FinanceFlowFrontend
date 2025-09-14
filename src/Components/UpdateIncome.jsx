import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rereducers/authSlice';
import HomeNav from './HomeNav';
import { Link, useParams } from 'react-router-dom';

const UpdateIncome = () => {
    let dispatch = useDispatch();
    let { id } = useParams();
    let user = useSelector((state)=>state.auth.user)
    let [income_name, setIncomeName] = useState('');
    let [date, setIncomeDate] = useState('');
    let [rs, setRs] = useState(0.0);
    
  
    useEffect(() => {
        const fetchIncome = async () => {
            try {
                let resp = await axios.get(`https://studied-territory-longest-mold.trycloudflare.com/ffb/income?iid=${id}`);
                let inco = resp.data.data;
               
                // Ensure income is fetched before setting state
                if (inco) {
                    setIncomeName(inco.income_name || '');
                    setIncomeDate(new Date(inco.date).toISOString().slice(0, 10));  // Format date as YYYY-MM-DD
                    setRs(inco.rs || 0.0);
                }
            } catch (error) {
                console.error("Error fetching income:", error);
            }
        };
        fetchIncome();
    }, [id]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const incomeAmount = parseFloat(rs);
        let object = {
            income_name,
            rs: incomeAmount,
            date
        };
        try {
            let res1 = await axios.patch(`https://studied-territory-longest-mold.trycloudflare.com/ffb/income?uid=${user.id}&iid=${id}`, object);
            dispatch(login(res1.data.data));
            alert("Income updated successfully!");
            
        } catch (error) {
            console.error("Error updating income:", error);
        }
    };
  
    return (
        <>
            <HomeNav />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col mt-5">
                        <h1 className='text-center text-secondary'>
                            Update <span className='text-danger'>Income</span>
                        </h1>
  
                        <form onSubmit={handleSubmit} className='text-center mt-3'>
                            <div className='form-group d-flex align-items-center flex-column mt-5'>
                                <label htmlFor="incomeName">Income Name</label>
                                <input
                                    value={income_name}
                                    onChange={(e) => setIncomeName(e.target.value)}
                                    className='form-control text-center w-50 mt-2'
                                    type="text"
                                    id="incomeName"
                                />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="incomeDate">Date</label>
                                <input
                                    value={date}
                                    onChange={(e) => setIncomeDate(e.target.value)}
                                    className='form-control text-center w-25 mt-2'
                                    type="date"
                                    id="incomeDate"
                                />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="incomeRs">Income RS ₹</label>
                                <input
                                    value={rs}
                                    onChange={(e) => setRs(e.target.value)}
                                    className='form-control text-center w-25 mt-2'
                                    type="number"
                                    id="incomeRs"
                                />
                            </div>
                            <input className='btn btn-danger mt-3 text-light' type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
        <div className="row">
          <div className="col text-center">
            <Link className='btn btn-dark mt-3' to={"/viewincome"} >back</Link>
          </div>
        </div>
      </div>
        </>
    );
};

export default UpdateIncome;
