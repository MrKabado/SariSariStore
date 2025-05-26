import React from 'react';
import Button from '../../components/Button';


function Admin() {
  return (
    <div>
      Admin Page

      <Button 
        to='/admin/item-list'
        label='View Item List'
      />

      <Button 
        to='/admin/debt-list'
        label='View Debt List'
      />

      <Button 
        to='/'
        label='Return to Homepage'
      />
    </div>
  )
}

export default Admin
