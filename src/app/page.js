"use client"
import Feed from "@/components/feed/Feed";
import Header from "@/components/header/Header";
import TweetForm from "@/components/tweetForm/TweetForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login")
    }
  })

  return (
    <div>
      <Header label="Home" />
      <TweetForm placeholder="What's on your mind today?" />
      <Feed />
    </div>
  )
}
