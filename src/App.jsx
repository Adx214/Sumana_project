import React from 'react'
import Super from './Pages/Super'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Not_found from './Pages/not_found'
import Dashboard from './Dashboard/Dashboard'
import Login from './Dashboard/Login'
import API from './Pages/API'
import UserManage from './Dashboard/UserManage'

const App = () => {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Super />} />
        <Route path = '*' element={<Not_found />} />
        <Route path = '/db' element={<Dashboard/>}/>
        <Route path = '/api' element={<API/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/manageUser' element={<UserManage/>} />
        
      </Routes>
    
      
    </>
  )
}

export default App