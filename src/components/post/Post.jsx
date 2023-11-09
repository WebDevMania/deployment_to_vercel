"use client"
import Image from 'next/image'
import person from '../../app/assets/pexels-justin-shaifer-1222271.jpg'
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from 'react-icons/ai'
import classes from './post.module.css'
import React, { useState } from 'react'
import { format } from 'timeago.js'
import Link from 'next/link'
import { api } from '@/lib/fetch'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Post = ({
    post,
    postLikes: likes,
}) => {
    const user = post?.userId
    const userId = post?.userId?._id
    const { data: session } = useSession()
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(post?.likes?.includes(session?.user?._id))
    const [postLikes, setPostLikes] = useState(likes)
    const router = useRouter()

    const handleLike = async (e) => {
        e.stopPropagation()

        try {
            const headers = {
                "Authorization": `Bearer ${session?.user?.accessToken}`
            }

            api.put(`post/like/${post?._id}`, headers)

            if (isLikedByCurrentUser) {
                setPostLikes(prev => prev - 1)
            } else {
                setPostLikes(prev => prev + 1)
            }

            setIsLikedByCurrentUser(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    const goToPost = (e) => {
        e.stopPropagation()
        router.push(`/post/${post?._id}`)
    }

    const goToProfile = (e) => {
        e.stopPropagation()
        router.push(`/profile/${userId}`)
    }

    return (
        <div className={classes.container} onClick={goToPost}>
            <div className={classes.wrapper}>
                <div onClick={goToProfile} className={classes.top}>
                    <div className={classes.imageContainer}>
                        {user?.profilePic ? <Image width="75" height="75" src={user?.profilePic} alt="" /> : <Image src={person} alt="" />}
                    </div>
                    <span className={classes.username}>
                        {user?.username}
                    </span>
                    <span className={classes.usernameTwitter}>
                        @{user?.username}
                    </span>
                    <span className={classes.postedAgo}>
                        {format(post?.createdAt)}
                    </span>
                </div>
                <p className={classes.desc}>
                    {post?.desc}
                </p>
                <div className={classes.actions}>
                    <div className={classes.action} onClick={() => router.push(`/post/${post?._id}`)}>
                        <AiOutlineComment size={25} />
                        <span>{post?.comments?.length || 0}</span>
                    </div>
                    <div className={classes.action}>
                        {
                            isLikedByCurrentUser
                                ? <AiFillHeart size={25} onClick={handleLike} />
                                : <AiOutlineHeart size={25} onClick={handleLike} />
                        }
                        <span>
                            {postLikes}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post