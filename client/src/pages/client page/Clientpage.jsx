import React from 'react'
import Button from '../../components/Button'

function Clientpage() {
  return (
    <>
    <div className='global-holder'>
      <h1>CUSTOMER PAGE</h1> 
        <Button 
          to='/client/item-list'
          label='View Item List'
          classname='btn'
        />
        <Button 
          to='/client/debt-list'
          label='View Debt List'
          classname='btn'
        />

        <Button 
          to='/'  
          label='Return To Home Page'     
          classname='btn' 
        />  
    </div>
    </>
  )
}

export default Clientpage
