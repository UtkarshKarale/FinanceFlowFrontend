import React, { useState, useEffect } from 'react';
import HomeNav from './HomeNav';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const HomePage = () => {
    const [spendSum, setSpendSum] = useState(0);
    const [incomeSum, setIncomeSum] = useState(0);
    const [borrowSum, setBorrowSum] = useState(0);
    const [ lentSum,setLentSum] = useState(0);
    const [saving, setSaving] = useState(0);
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user); 

    useEffect(() => {
        
        document.title="financeFlow - Home"
        
        if (!user) {
           
            navigate("/");
        } else {
            const spendlist = user.spendList || [];
            const incomelist = user.incomeslist || [];
            const lents = user.lents || [];
            const borrowslist = user.borrowslist || [];
            const spendTotal = spendlist.reduce((acc, cv) => acc + cv.rs, 0);
            const incomeTotal = incomelist.reduce((acc, cv) => acc + cv.rs, 0);
            const Totallent = lents.reduce((acc, cv) => acc + cv.rs, 0);
            const Totalborrow = borrowslist.reduce((acc, cv) => acc + cv.rs, 0);
            setSpendSum(spendTotal);
            setIncomeSum(incomeTotal);
            setLentSum(Totallent);
            setSaving(incomeTotal - spendTotal);  

            setBorrowSum(Totalborrow)
        }
        
    }, [user,navigate]); 

    return (
        <>
            <HomeNav />
            <div className="container-fluid m-0 p-0">
                <div className="row d-flex justify-content-center">
                    <h1 className='text-center justify-content-around mt-4 text-secondary'>Your Overall <span className='text-danger'> Numbers </span></h1>

                    <div style={{ height: "200px" }} className="col-5 col-md-3 m-2 bg-danger text-light text-center d-flex align-items-center justify-content-center flex-column">
                        <h1  >{spendSum} ₹</h1>
                        <p className='text-light' >Total Spend</p>
                        <Link to={"/viewspend"} className='btn btn-light'> Manage Spend</Link>
                    </div>

                    <div style={{ height: "200px" }} className="col-5 col-md-3 m-2 bg-light text-center d-flex align-items-center justify-content-center flex-column">
                        <h1>{incomeSum} ₹</h1>
                        <p>Total Income</p>
                        <Link to={"/viewincome"} className=' btn btn-dark'> Manage Income</Link>
                    </div>

                    <div style={{ height: "200px" }} className="col-10 col-md-3 m-2 bg-success text-light text-center d-flex align-items-center justify-content-center flex-column">
                        <h1>{saving} ₹</h1>
                        <p>Total Saving</p>
                    </div>
                   
                </div>
                <div className="row text-center justify-content-center">
                <div style={{ height: "200px" }} className="col-5 col-md-3 m-2 bg-warning text-light text-center d-flex align-items-center justify-content-center flex-column">
                        <h1>{lentSum} ₹</h1>
                        <p>Total Lent Amount</p>
                        <Link to={"/viewlent"} className='btn btn-light'> Manage Lent</Link>
                    </div>
                <div style={{ height: "200px" }} className="col-5 col-md-3 m-2 bg-danger text-light text-center d-flex align-items-center justify-content-center flex-column">
                        <h1>{borrowSum} ₹</h1>
                        <p>Total Borrow or Loan</p>
                        <Link to={"/viewborrow"} className='btn btn-light'> Manage Borrow</Link>
                    </div>
                    <div style={{ height: "200px", overflow: "scroll" }} className="col-10 col-md-3 m-2  bg-dark text-light text-center  ">
                    <p className='mt-1 p-1 text-secondary '>According to your borrow, here are some EMI plans:</p>

                    {borrowSum > 1000 ? (
                       <>
            <h1  >~{Math.round(borrowSum / 6)}</h1>
            <p className='text-secondary' >per month for the next 6 months</p>

            <h1  >~{Math.round(borrowSum / 12)}</h1>
            <p className='text-secondary' >per month for the next 1 year</p>

            <h1  >~{Math.round(borrowSum / 24)}</h1>
            <p className='text-secondary' >per month for the next 2 years</p>
                        
                         

        </>
    ) : borrowSum > 10 && borrowSum < 999 ? (
        <>
            <h1  >~{Math.round(borrowSum / 6)}</h1>
            <p className='text-secondary' >per month for the next 6 months</p>

            <h1  >~{Math.round(borrowSum / 12)}</h1>
            <p className='text-secondary' >per month for the next 1 year</p>

            <h1  >~{Math.round(borrowSum / 24)}</h1>
            <p className='text-secondary' >per month for the next 2 years</p>
        </>
    ) : (
        <p>No EMI plans available for amounts less than or equal to 10.</p>
    )}
</div>


                </div>
            </div>
       
        </>
    );
};

export default HomePage;

