import React from 'react';
import { useState } from 'react';

import Button from "../../components/Button";


function AdminLogIn() {
  return (
    <>
      <div>
        <form>
          <label htmlFor="">Username: </label>
          <input type="text" className='border border-solid border-black'/><br />
          <label htmlFor="">Password</label>
          <input 
            type="password" 
            className='border border-solid border-black'
          />
          <br />

          <Button to='/admin' label="Submit"/>
          <Button to='/' label="Return"/>
        </form>
      </div>
    </>
  ) 
}
export default AdminLogIn
