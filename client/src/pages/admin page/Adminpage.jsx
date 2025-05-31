import React from 'react';
import Button from '../../components/Button';

function Adminpage() {
  return (
    <div className='global-holder'>
      <h1>ADMIN PAGE</h1>

      <Button 
        to='/admin/item-list'
        label='View Item List'
        classname='btn'
      />

      <Button 
        to='/admin/debt-list'
        label='View Debt List'
        classname='btn'
      />

      <Button 
        to='/'
        label='Return to Homepage'
        classname='btn'
      />
    </div>
  )
}

export default Adminpage
