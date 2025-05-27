import React from 'react'
import { Link } from 'react-router-dom'

function Button({to, label, classname, btnType}) {
  if (to) {
    return (
      <Link to={to}>
        <button type={btnType } className={classname}>{label}</button>
      </Link>
    )
  }

  return (
    <div>
      <button type={btnType } className={classname}>{label}</button>
    </div>
  )
}

export default Button
