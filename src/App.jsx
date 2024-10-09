import React from 'react'
import Signup from './Components/Signup'
import Login from './Components/Login'
import HomePage from './Components/HomePage'
import AddSpend from './Components/AddSpend'
import AddIncome from './Components/AddIncome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ViewMySpend from './Components/ViewMySpend'
import ViewMyIncome from './Components/ViewMyIncome'
import ViewLents from './Components/ViewLents'
import ViewBorrow from './Components/ViewBorrow'
import AddBorrow from './Components/AddBorrow'
import AddLent from './Components/AddLent'
import MyProfile from './Components/MyProfile'
import UpdateBorrow from './Components/UpdateBorrow'
import UpdateIncome from './Components/UpdateIncome'
import UpdateSpend from './Components/UpdateSpend'
import UpdateLent from './Components/UpdateLent'


const App = () => {
  return (
    <BrowserRouter basename='FinanceFlow-_Frontend'>
    <Routes>
        
        <Route path='/' element={<Login/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/addincome' element={<AddIncome/>} />
        <Route path='/addborrow' element={<AddBorrow/>} />
        <Route path='/addlent' element={<AddLent/>} />
        <Route path='/addspend' element={<AddSpend/>} />
        <Route path='/viewspend' element={<ViewMySpend/>} />
        <Route path='/viewincome' element={<ViewMyIncome/>} />
        <Route path='/viewlent' element={<ViewLents/>} />
        <Route path='/viewborrow' element={<ViewBorrow/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/updateborrow/:id' element={<UpdateBorrow/>} />
        <Route path='/updateincome/:id' element={<UpdateIncome/>} />
        <Route path='/updatespend/:id' element={<UpdateSpend/>} />
        <Route path='/updatelent/:id' element={<UpdateLent/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
