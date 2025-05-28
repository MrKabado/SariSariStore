import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'

//admin page
import AdminLogIn from './pages/admin page/AdminLogIn';
import Admin from './pages/admin page/Adminpage';
import AdminItemlists from './pages/admin page/AdminItemlists';
import AdminDebtlist from './pages/admin page/AdminDebtlist';

//client page
import Clientpage from './pages/client page/Clientpage';
import ClientDebtlist from './pages/client page/ClientDebtlist';
import ClientItemlist from './pages/client page/ClientItemlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}/>

        {/* admin side */}
        <Route path="/admin/login" element={<AdminLogIn />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin/item-list' element={<AdminItemlists />}/>
        <Route path='/admin/debt-list' element={<AdminDebtlist />}/>

        {/* client side */}
        <Route path='/client' element={<Clientpage />}/>
        <Route path='/client/item-list' element={<ClientItemlist />}/>
        <Route path='/client/debt-list' element={<ClientDebtlist />}/>

      </Routes>
    </Router>
  )
}

export default App
