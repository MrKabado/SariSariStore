import React from 'react';
import { useState } from 'react';
import Button from "../../components/Button";

function AdminLogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit =(e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      alert('Login Successfuly!');
      window.location.href = '/admin';
    } else {
      setMessage('Invalid username or password');
    }
  }

  return (
    <>
      <div className='global-holder'>
        <form onSubmit={handleSubmit}>
          <h1>LOG-IN AS ADMIN</h1>
          <div>
            <input 
              type="text"
              placeholder='username'
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input 
              type="password" 
              placeholder='password'       
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}   
              required
            />
          </div>
          
          <Button classname='btn' btnType="submit" label="Submit"/>
          <Button classname='btn' to='/' label="Return"/>
        </form>
        <p className='text-red-500'>{message}</p>
      </div>
    </>
  ) 
}
export default AdminLogIn
