"use client"
import classes from './rightbar.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/fetch'

const Rightbar = () => {
    const [friends, setFriends] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const headers = {
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                }

                const friends = await api.get(`user/find-users`, headers)
                setFriends(friends)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?.accessToken && fetchFriends()
    }, [session?.user?.accessToken])


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h2>Find your new friends</h2>
                {friends?.map((friend) => (
                    <div key={friend._id} className={classes.user}>
                        <Image
                            src={friend?.profilePic ? friend?.profilePic : person}
                            width="50"
                            height="50"
                            alt=""
                        />
                        <div className={classes.userData}>
                            <h4>
                                {friend?.username}
                            </h4>
                            <span className={classes.usernameTwitter}>
                                @{friend?.username}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Rightbar