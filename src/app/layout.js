"use client"
import './globals.css'
import SessionProvider from './SessionProvider'
import { Inter } from 'next/font/google'
import Rightbar from '@/components/rightbar/Rightbar'
import Sidebar from '@/components/sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="container">
            <div className="wrapper">
              <Sidebar />
              {children}
              <Rightbar />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
