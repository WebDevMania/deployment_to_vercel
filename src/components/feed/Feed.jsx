"use client"
import { api } from '@/lib/fetch'
import Post from '../post/Post'
import classes from './feed.module.css'
import React, { useEffect, useState } from 'react'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await api.get('/post')

        setPosts(posts)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        {posts?.map((post) => (
          <Post
            key={post._id}
            post={post}
            postLikes={post?.likes?.length}
          />
        ))}
      </div>
    </div>
  )
}

export default Feed