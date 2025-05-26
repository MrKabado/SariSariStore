import React from 'react'
import { Link } from 'react-router-dom'

function Button({to, label, classname}) {
  return (
    <div>
        <Link to={to}>
            <button className={classname}>{label}</button>
        </Link>
    </div>
  )
}

export default Button
