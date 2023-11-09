"use client"
import classes from './register.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/fetch'
import Link from 'next/link'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async () => {
    if (username === "" || email === "" || password === "") {
      toast.error("Fill all fields!")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!")
      return
    }

    try {
      const headers = {
        'Content-Type': 'application/json'
      }

      const body = {
        username,
        email,
        password
      }

      await api.post("/register", headers, body)

      router.push('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h3>Register</h3>
        </div>
        <div className={classes.inputs}>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={handleRegister} className={classes.registerButton}>
          Register
        </button>
      </div>
      <ToastContainer />
      <span className={classes.loginMessage}>
        Don&apos;t have an account?
        <Link className={classes.login} href='/login'>
          Login
        </Link>
      </span>
    </div>
  )
}

export default Register