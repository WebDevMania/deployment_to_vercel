"use client"

import classes from './notifications.module.css'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { api } from '@/lib/fetch'
import Header from '@/components/header/Header'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Notification from '@/components/notification/Notification'

const Notifications = () => {
    const { data: session } = useSession()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const headers = {
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                }

                const data = await api.get(`notifications`, headers)

                setData(data)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchNotifications()
    }, [session?.user?._id])

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header
                    label="Notifications"
                    backArrow={<AiOutlineArrowLeft />}
                />
                {data && data?.map((n) => (
                    <Notification
                        key={n._id}
                        notification={n}
                    />
                ))}
            </div>
        </div>
    )
}

export default Notifications