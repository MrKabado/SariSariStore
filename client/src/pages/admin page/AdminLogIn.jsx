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
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username: </label>
            <input 
              type="text"
              placeholder='username'
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label>Password: </label>
            <input 
              type="password" 
              placeholder='password'       
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}   
            />
          </div>
          
          <Button btnType="submit" label="Submit"/>
          <Button to='/' label="Return"/>
        </form>
        <p>{message}</p>
      </div>
    </>
  ) 
}
export default AdminLogIn
