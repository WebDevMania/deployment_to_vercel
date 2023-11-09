"use client"
import Header from '@/components/header/Header'
import Post from '@/components/post/Post'
import classes from './profile.module.css'
import React, { useEffect, useState } from 'react'
import coverPicture from '../../assets/pexels-markus-spiske-965345.jpg'
import profilePicture from '../../assets/pexels-justin-shaifer-1222271.jpg'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/lib/fetch'
import { format } from 'timeago.js'
import { BiCalendar } from 'react-icons/bi'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ActionButtons from '@/components/actionButtons/ActionButtons'

const Profile = (ctx) => {
    const id = ctx.params.id

    const [profile, setProfile] = useState("")
    const [posts, setPosts] = useState([])
    const [isFollowed, setIsFollowed] = useState(false)
    const router = useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login")
        }
    })

    const isOwnProfile = session?.user?._id === profile?._id;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await api.get(`user/${id}`)

                setIsFollowed(prev => {
                    if (profile?.followers?.includes(session?.user?._id)) {
                        return true
                    }
                })
                setProfile(profile)
            } catch (error) {
                console.log(error)
            }
        }
        session?.user?._id && fetchProfile()
    }, [id, session?.user?._id])

    useEffect(() => {
        const fetchProfilePosts = async () => {
            try {
                const posts = await api.get(`post?userId=${id}`)

                setPosts(posts)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfilePosts()
    }, [id])

    const handleFollow = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${session?.user?.accessToken}`
            }

            await api.put(`user/follow/${id}`, headers)

            setIsFollowed(prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header
                    label={profile?.username}
                    backArrow={<AiOutlineArrowLeft />}
                />
                <div className={classes.coverPicture}>
                    {
                        profile?.coverPic
                            ? <Image height="500" width="500" src={profile?.coverPic} alt="cover picture" />
                            : <Image src={coverPicture} alt="cover picture" />
                    }
                </div>
                <div className={classes.profilePicture}>
                    {
                        profile?.profilePic
                            ? <Image height="500" width="500" src={profile?.profilePic} alt="cover picture" />
                            : <Image src={profilePicture} alt="cover picture" />
                    }
                </div>
                <ActionButtons
                    isOwnProfile={isOwnProfile}
                    id={id}
                    isFollowed={isFollowed}
                    handleFollow={handleFollow}
                />
                <div className={classes.profileData}>
                    <h1 className={classes.username}>
                        {profile?.username}
                    </h1>
                    <h4 className={classes.tagUsername}>
                        @{profile?.username}
                    </h4>
                    <span className={classes.bio}>
                        {profile?.bio ? profile?.bio : "No bio"}
                    </span>
                    <span className={classes.profileJoined}>
                        <BiCalendar size={22} /> Joined {format(profile?.createdAt)}
                    </span>
                    <div className={classes.followData}>
                        <div className={classes.following}>
                            <span>{profile?.followings?.length} <span>following</span></span>
                        </div>
                        <div className={classes.followers}>
                            <span>{profile?.followers?.length} <span>followers</span></span>
                        </div>
                    </div>
                </div>
                {posts?.length > 0
                    ? posts?.map((post) => (
                        <Post
                            postLikes={post?.likes?.length}
                            key={post?._id}
                            post={post}
                        />
                    ))
                    : <h2 className={classes.noPostsYet}>No posts yet.</h2>
                }
            </div>
        </div>
    )
}

export default Profile