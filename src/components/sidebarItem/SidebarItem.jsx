"use client"
import { useSession } from 'next-auth/react'
import classes from './sidebarItem.module.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BsDot } from 'react-icons/bs'
import { api } from '@/lib/fetch'

const SidebarItem = ({
    item,
}) => {
    const [user, setUser] = useState({})
    const isSignInItem = item.label === "Sign in"
    const isLoggedOutItem = item.label === "Logout"
    const isNotificationItem = item.label === "Notifications"

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await api.get(`user/${session?.user?._id}`)

                console.log(user)

                setUser(user)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchUser()
    }, [session?.user?._id])

    if (session?.user?._id && isSignInItem) {
        return null
    }

    if (!session?.user?._id && isLoggedOutItem) {
        return null
    }


    const goToNotificationPage = () => {
        if (isNotificationItem) {
            router.push('/notifications')
        }
    }


    return (
        <div className={classes.container} onClick={goToNotificationPage}>
            <div className={classes.wrapper} onClick={item.function}>
                <div className={classes.icon}>
                    {
                        user?.hasNotifications &&
                        isNotificationItem &&
                        <BsDot size={60} className={classes.dot} />
                    }
                    {item.icon}
                </div>
                <div className={classes.label}>
                    {item.label}
                </div>
            </div>
        </div>
    )
}

export default SidebarItem