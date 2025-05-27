import React from 'react'

function Input(InputType, PlaceHolder, Id) {
  return (
    <div>
      <input type={InputType} placeholder={PlaceHolder} id={Id}/>
    </div>
  )
}

export default Input
