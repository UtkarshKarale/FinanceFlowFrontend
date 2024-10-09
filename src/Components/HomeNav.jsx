import React from 'react';
import {useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const HomeNav = () => {
    
   
    let resp = useSelector((state) => state.auth.user);

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light sticky-top'>
            <div className='container-fluid  m-0 p-0'>
              
                <h3 className='navbar-brand ms-2 text-secondary'>
                    Finance <span className='text-danger'>Flow</span>
                </h3>
               
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <Link to={`/home`} className='nav-link'>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/viewincome`} className='nav-link'>
                                View My Income
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/viewspend`} className='nav-link'>
                                View My Spend
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/viewlent`} className='nav-link'>
                                View Lents
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to={`/viewborrow`} className='nav-link'>
                                View Borrow
                            </Link>
                        </li>
                        
                    </ul>
                   
                </div>
                
                <Link  style={{width:"50px",height:"50px"}} to={"/myprofile"} className=' me-2 p-2 bg-danger text-light rounded-circle text-decoration-none text-center ms-3'>
                        <h5>{resp && resp?.name[0].toUpperCase()}</h5>
                </Link>
                
            </div>
        </nav>
    );
};

export default HomeNav;
