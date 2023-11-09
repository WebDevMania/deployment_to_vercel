"use client"
import Header from '@/components/header/Header'
import classes from './postDetails.module.css'
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TweetForm from '@/components/tweetForm/TweetForm'
import { api } from '@/lib/fetch'
import Post from '@/components/post/Post'
import Comment from '@/components/comment/Comment'

const PostDetails = (ctx) => {
    const id = ctx.params.id
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const post = await api.get(`post/${id}`)

                setPost(post)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDetails()
    }, [])


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Header
                    label="Tweet"
                    backArrow={<AiOutlineArrowLeft />}
                />
                {post &&
                    <Post
                        post={post}
                        postLikes={post?.likes?.length}
                    />
                }
                <TweetForm
                    placeholder="Tweet your reply"
                    postId={id}
                />
                {post?.comments?.map((commentId) => (
                    <Comment
                        key={commentId}
                        commentId={commentId}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostDetails