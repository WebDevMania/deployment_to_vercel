import classes from './sidebar.module.css'
import { BsTwitter } from 'react-icons/bs'
import { IoIosNotifications } from 'react-icons/io'
import { AiFillHome, AiOutlineLogin } from 'react-icons/ai'
import { BiSolidUser, BiLogOut } from 'react-icons/bi'
import React from 'react'
import SidebarItem from '../sidebarItem/SidebarItem'
import Link from 'next/link'
import { signIn, signOut } from 'next-auth/react'

const Sidebar = () => {

  const sidebarItems = [
    {
      icon: <AiFillHome size={25} />,
      label: "Home",
    },
    {
      icon: <IoIosNotifications size={25} />,
      label: "Notifications",
    },
    {
      icon: <BiSolidUser size={25} />,
      label: "Profile",
    },
    {
      icon: <BiLogOut size={25} />,
      label: "Logout",
      function: () => signOut()
    },
    {
      icon: <AiOutlineLogin size={25} />,
      label: "Sign in",
      function: () => signIn()
    }
  ]

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link href='/' className={classes.logo}>
          <BsTwitter size={30} />
        </Link>
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default Sidebar