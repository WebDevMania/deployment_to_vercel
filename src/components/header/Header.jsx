import Link from 'next/link'
import classes from './header.module.css'
import React from 'react'

const Header = ({
  label,
  backArrow,
}) => {

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {backArrow && (
          <Link href='/'>
            {backArrow}
          </Link>
        )}
        {label && (
          <h3>
            {label}
          </h3>
        )}
      </div>
    </div>
  )
}

export default Header