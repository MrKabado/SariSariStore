import React from "react";
import Button from "../components/Button";

function Homepage() {
  return(
      <div className="global-holder">       
        <h1 className="">WELCOME TO JENNY SARI-SARI STORE</h1>
        <Button 
          to='/client' 
          label='Proceed as Customer'
          classname='btn'
          />

        <Button 
          to='/admin/login'
          label='Proceed as Admin'
          classname='btn'
        />
      </div>
  )
}

export default Homepage;

