import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rereducers/authSlice';

const ViewMySpend = () => {
    let spendList = useSelector((state)=>state.auth.user?.spendList)
    let user = useSelector((state)=>state.auth.user)
    const [tableSum , setTableSum] = useState(0)
    let [filterSpendList ,setFilterSpendList] = useState(spendList)
    let dispatch = useDispatch();
    let [fromdate,setFromdate] = useState();
    let [todate,setTodate] = useState();
    let navigate = useNavigate()

    const handleDelete= async (id)=>{
        try{
        let res = await axios.delete(`https://studied-territory-longest-mold.trycloudflare.com/ffb/spend?uid=${user.id}&sid=${id}`)
        dispatch(login(res.data.data))
        setFilterSpendList(res.data.data.spendList)
        alert(res.data.message)
        }
        catch(error)
        {
            alert("something went wrong")
        }
    }
    
    const handleSort = (e) =>{
        e.preventDefault();
        let fdata = spendList?.filter((cv) => {
            const spenddate = new Date(cv.date);
            const fromDateObj = new Date(fromdate);
            const toDateObj = new Date(todate);
            return spenddate >= fromDateObj && spenddate <= toDateObj;
        });
        setFilterSpendList(fdata);



    }

    useEffect(()=>{
        if(!user)
            {
                navigate("/")
            } 

        let sum = filterSpendList&&filterSpendList.reduce((acc,cv)=>{return acc + cv.rs},0)
        console.log(sum)
        setTableSum(sum)
    },[filterSpendList,user,navigate])


  return (
    <>
       <HomeNav/> 

        <div className="container">
            <div className="row text-center">
                <div className="col mt-3">
                    <Link to={"/addspend"} className='btn btn-dark' >Add Spend</Link>
                </div>
            </div>
        </div>

       <form action="" className='form' onSubmit={handleSort}>
       
       <div className="form-group d-flex justify-content-center align-items-center my-5 ">
        <h6 > FROM</h6>
       <input value={fromdate} onChange={(e)=>{setFromdate(e.target.value)}} className=' mx-2 form-control w-25' type="date" name="" id="" />
        <h6 >To</h6>
       <input value={todate} onChange={(e)=>{setTodate(e.target.value)}} className=' mx-2 form-control w-25' type="date" name="" id="" />
       <input className=' mx-2 btn btn-sm btn-primary' value="sort" type="submit"  />
       </div>
       </form>
       <div className="container">
        <div className="row">
            <div className="col-12">
                <table className='table   text-center table-secondary table-hover table-responsive table-bordered table-sm'>
                    <thead className='table-head'>
                        <tr>
                            <th scope='col' >Spend Name</th>
                            <th scope='col' >Date</th>
                            <th scope='col' >Spend Rs</th>
                            <th scope='col' >Action</th>
                            <th scope='col' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                    
                        filterSpendList && filterSpendList.map((cv,index)=>{
                            return <tr className='table-light text-secondary text-center' key={index}> 
                                <td><h6>{cv.spendName.toUpperCase()}</h6></td>
                                <td>{cv.date}</td>
                                <td>{cv.rs} </td>
                                <td><Link  to={`/updatespend/${cv.id}`} className='btn btn-warning btn-sm' >Update</Link></td>
                                <td><Link onClick={()=>{handleDelete(cv.id)}} className='btn btn-danger btn-sm'> Delete</Link></td> 
                            </tr>

                        })

                    }
                    <tr>
                        <td colSpan={2}> <h3> Total Spend</h3></td>
                        <td className='bg-danger text-light' colSpan={3}> <h3> {tableSum}</h3></td>
                        
                    </tr>
                    
                    </tbody>

                </table>
            </div>
        </div>
       </div>
       <div className="container">
            <div className="row text-center">
                <div className="col mt-3">
                    <Link to={"/home"} className='btn btn-dark' > Home</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default ViewMySpend
