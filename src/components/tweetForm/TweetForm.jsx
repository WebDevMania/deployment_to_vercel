"use client"
import classes from './tweetForm.module.css'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { api } from '@/lib/fetch'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const TweetForm = ({
    placeholder,
    postId = undefined
}) => {
    const [desc, setDesc] = useState("")
    const [user, setUser] = useState({})
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await api.get(`user/${session?.user?._id}`)
                console.log(data)
                setUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchCurrentUser()
    }, [session?.user?._id])

    const handleClick = async (e) => {
        if (session?.user == null) {
            router.push("/login")
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`
            }

            const body = {
                userId: session?.user?._id
            }

            // whether it's a comment or a post
            if (postId) {
                body.postId = postId
                body.text = desc
            } else {
                body.desc = desc
            }

            let newComment = null
            let newPost = null

            postId
                ? newComment = await api.post(`/comment`, headers, body)
                : newPost = await api.post('/post', headers, body)

            toast.success("Successfully tweeted!")

            window.location.reload()
            setDesc("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.top}>
                    <Link
                        href={`/profile/${session?.user?._id}`}
                        className={classes.imageContainer}
                    >
                        {user?.profilePic ? <Image width="75" height="75" src={user?.profilePic} alt="" /> : <Image src={person} alt="" />}
                    </Link>
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={classes.bottom}>
                    <button onClick={handleClick} className={classes.tweetButton}>
                        Tweet
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default TweetForm