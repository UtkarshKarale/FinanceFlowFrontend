import React, { useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login } from '../rereducers/authSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UpdateSpend = () => {
    let { id } = useParams();
    let dispatch = useDispatch();
    let user = useSelector((state) => state.auth.user);

    // Initialize state variables with default values
    let [spendName, setSpendTitle] = useState('');
    let [sepndrs, setSpendRs] = useState(0.0);
    let [sepndDate, setDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today's date
    let navigate = useNavigate();
    useEffect(() => {
        if(!user)
            {
                navigate("/")
            } 
        const fetchIncome = async () => {
            try {
                let resp = await axios.get(`https://financeflow-production.up.railway.app/spend?sid=${id}`);
                let inco = resp.data.data;
                
                if (inco) {
                    setSpendTitle(inco.spendName || ''); // Ensure it's not undefined
                    setSpendRs(inco.rs || 0.0); // Default to 0 if undefined
                    setDate(new Date(inco.date).toISOString().slice(0, 10));  // Format date as YYYY-MM-DD
                }
            } catch (error) {
                console.error("Error fetching spend:", error);
            }
        };
        fetchIncome();
    }, [id,user,navigate]);

    const handlesbumit = async (e) => {
        e.preventDefault();
        const spendAmount = parseFloat(sepndrs);
        const date = new Date(sepndDate);

        let object = {
            spendName: spendName,
            rs: spendAmount,
            date: date.toISOString() 
        };

            let res1 = await axios.patch(`https://financeflow-production.up.railway.app/spend?uid=${user?.id}&sid=${id}`, object);
            console.log(res1.data.data);
            dispatch(login(res1.data.data));
            alert(res1.data.message); 
    
            
            
        
    };

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
                                <input value={spendName} onChange={(e) => setSpendTitle(e.target.value)} className='form-control text-center w-50 mt-2' type="text" name="spendTitle" id="spendTitle" />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="spendAmount">Spend RS ₹ </label>
                                <input value={sepndrs} onChange={(e) => setSpendRs(e.target.value)} className='form-control text-center w-25 mt-2' type="number" name="spendAmount" id="spendAmount" />
                            </div>
                            <div className='form-group d-flex align-items-center flex-column mt-4'>
                                <label htmlFor="spendDate">Spend Date </label>
                                <input value={sepndDate} onChange={(e) => setDate(e.target.value)} className='form-control text-center w-25 mt-2' type="date" name="spendDate" id="spendDate" />
                            </div>
                            <input className='btn btn-danger mt-3 text-light' type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row text-center">
                    <div className="col mt-3">
                        <Link to={"/viewspend"} className='btn btn-dark'> Back</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateSpend;
