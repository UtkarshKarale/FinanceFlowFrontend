import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rereducers/authSlice';

const ViewMyIncome = () => {
  
    let incomelist = useSelector((state)=>state.auth.user?.incomeslist)
    let user = useSelector((state)=>state.auth.user)
    let [filterincomelist,setFilterIncomeList] = useState(incomelist)
    const [tableSum , setTableSum] = useState(0)
    let [fromdate,setFromdate] = useState();
    let [todate,setTodate] = useState();
    let dispatch = useDispatch()
    let navigate =useNavigate()
    
    const handlesort = (e) => {
        e.preventDefault();
        let fdata = incomelist?.filter((cv) => {
            const borrowDate = new Date(cv.date);
            const fromDateObj = new Date(fromdate);
            const toDateObj = new Date(todate);
            return borrowDate >= fromDateObj && borrowDate <= toDateObj;
        });
        console.log(fdata)
        setFilterIncomeList(fdata);
    };
     const  deletehandle= async (id)=>{
        try{
            let res = await axios.delete(`https://studied-territory-longest-mold.trycloudflare.com/ffb/income?uid=${user.id}&iid=${id}`);
            dispatch(login(res.data.data))
            alert(res.data.message)
            setFilterIncomeList(res.data.data.incomeslist)

        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(!user)
            {
                navigate("/")
            } 
        let sum = filterincomelist&&filterincomelist.reduce((acc,cv)=>{return acc + cv.rs},0)
        console.log(sum)
        setTableSum(sum)    
    },[filterincomelist,user,navigate])

  return (
    <>
       <HomeNav /> 

        <div className='container'>
            <div className="row">
                <div className="col d-flex justify-content-center">
                    <Link to={"/addincome"} className='btn btn-dark mt-2'> Add Income </Link>
                </div>
            </div>
        </div>
       <form action="" onSubmit={handlesort} className='form'>
       
       <div className="form-group d-flex justify-content-center align-items-center my-5 ">
       
        <h6 > FROM</h6>
       <input  value={fromdate} onChange={(e)=>{ setFromdate(e.target.value)}} className=' mx-2 form-control w-25' type="date" name="" id="" />
        <h6 >To</h6>
       <input value={todate} onChange={(e)=>{ setTodate(e.target.value)}}  className=' mx-2 form-control w-25' type="date" name="" id="" />
       <input  className=' mx-2 btn btn-sm btn-primary' value="sort" type="submit"  />
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
                    
                        filterincomelist && filterincomelist.map((cv,index)=>{
                            return <tr className='table-light text-secondary text-center' key={index}> 
                                <td><h6>{cv.income_name.toUpperCase()}</h6></td>
                                <td>{cv.date}</td>
                                <td>{cv.rs} </td>
                                <td><Link to={`/updateincome/${cv.id}`} className='btn btn-warning btn-sm' >Update</Link></td>
                                <td><Link  onClick={()=>{deletehandle(cv.id)}} className='btn btn-danger btn-sm'> Delete</Link></td>
                               
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
        <div className="row">
          <div className="col text-center">
            <Link className='btn btn-dark mt-3' to={"/home"} >Home</Link>
          </div>
        </div>
      </div>
    </>
  )
}


export default ViewMyIncome
