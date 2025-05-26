import React from 'react'
import Button from '../../components/Button'

function AdminItemlist() {
  return (
    <>
    <div>
        Item List

        <Button 
          to='/admin'  
          label='Return To Admin Page'      
        />
    </div>
    </>
  )
}

export default AdminItemlist
