import React, { useEffect, useState } from 'react'
import HomeNav from './HomeNav'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { login } from '../rereducers/authSlice'

const ViewBorrow = () => {
    let borrowlist = useSelector((state)=>state.auth.user?.borrowslist)
    let  [Filteredborrowlist,setFilterborrowlist] = useState(borrowlist) 
    let user = useSelector((state)=>state.auth.user)
    const [tableSum , setTableSum] = useState(0);
    let dispatch = useDispatch()
    let [fromdate,setFromdate] = useState();
    let [todate,setTodate] = useState();
    let navigate = useNavigate()
    
    
    useEffect(()=>{
        if(!user)
        {
            navigate("/")
        }
        document.title="financeFlow - View Borrow"
        // setFilterborrowlist(borrowlist)
        let sum = Filteredborrowlist&&Filteredborrowlist?.reduce((acc,cv)=>{return acc + cv.rs},0)
        console.log(sum)
        setTableSum(sum)
    },[Filteredborrowlist,navigate,user])

    const handlesort = (e) => {
        e.preventDefault();
        let fdata = borrowlist?.filter((cv) => {
            const borrowDate = new Date(cv.localDate);
            const fromDateObj = new Date(fromdate);
            const toDateObj = new Date(todate);
            return borrowDate >= fromDateObj && borrowDate <= toDateObj;
        });
        setFilterborrowlist(fdata);
    };
     const  deletehandle= async (id)=>{
        try{
            
            let res = await axios.delete(`https://studied-territory-longest-mold.trycloudflare.com/ffb/borrow?uid=${user.id}&bid=${id}`);
            dispatch(login(res.data.data))
            setFilterborrowlist(res.data.data.borrowslist)
            alert(res.data.message)

        }catch(error){
            console.log(error)
        }
    }

    
  return (
    <>
       <HomeNav /> 
      
        <div className="container">
            <div className="row text-center">
                <div className="col"><Link to={"/addborrow"} className='btn btn-dark ms-auto mt-2'> Add Borrow</Link>
                </div>
            </div>
            <div className="row text-center">
                <div className="col mt-3">
                    <h1 className='text-secondary' >Borrow  <span className='text-danger'> List </span></h1>
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
                            <th scope='col' >Borrow or Loan Title </th>
                            <th scope='col' >Date</th>
                            <th scope='col' >Spend Rs</th>
                            <th scope='col' >From</th>
                            <th scope='col' >Action</th>
                            <th scope='col' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        
                    {
                        
    
                        Filteredborrowlist && Filteredborrowlist.map((cv,index)=>{
                            
                            return <tr className='table-light text-secondary text-center' key={index}> 
                                <td><h6>{cv.borrow_name?.toUpperCase()}</h6></td>
                                <td>{cv.localDate}</td>
                                <td>{cv.rs} </td>
                                <td>{(cv.from_user)?cv.from_user:"-" } </td>
                                <td><Link to={`/updateborrow/${cv.id}`} className='btn btn-warning btn-sm' >Update</Link></td>
                                <td><Link onClick={()=>{deletehandle(cv.id)}} className='btn btn-danger btn-sm'> Delete or Paid</Link></td>
                               
                            </tr>

                        })

                    }
                    <tr>
                        <td colSpan={3}> <h3> Total Borrow</h3></td>
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


export default ViewBorrow
