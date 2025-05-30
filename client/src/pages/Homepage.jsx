import React from "react";
import Button from "../components/Button";

function Homepage() {
  return(
      <div>       
        <h1 className="font-">WELCOME TO JENNY SARI-SARI STORE</h1>
        <Button 
          to='/client' 
          label='Proceed as Customer'
          />

        <Button 
          to='/admin/login'
          label='Proceed as Admin'
        />
      </div>
  )
}

export default Homepage;

