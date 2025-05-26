import React from 'react'
import Button from '../../components/Button'

function Clientpage() {
  return (
    <>
    <div>
      Client Page 
        <Button 
          to='/client/item-list'
          label='View Item List'
        />
        <Button 
          to='/client/debt-list'
          label='View Debt List'
        />

        <Button 
          to='/'  
          label='Return To Home Page'      
        />  
    </div>
    </>
  )
}

export default Clientpage
