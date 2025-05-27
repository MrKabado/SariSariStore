import React from 'react'

function Label(For, LabelName) {
  return (
    <div>
      <label htmlFor={For}>{LabelName}</label>
    </div>
  )
}

export default Label
