'use client'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import AddPost from "./components/AddPosts"
import Post from "./components/Post"

// Fetch all post
const getPosts = async () => {
  // const response = await axios.get("/api/posts/get-posts")
  const response = await fetch(`/api/posts/get-posts`, { cache: 'no-store' });

  return response.json();
}


export default function Home() {
  const {isLoading, isError, data, error} = useQuery({queryKey: ['posts'], queryFn: getPosts})

	// Error and Loading states
  if (isLoading) {
    return <span>Loading...</span>
  }
  if (isError) {
    return error
  }

  // Show the response if everything is fine
  return (
    <main>
      <AddPost />
      {data.map((post:any) => (
         <Post 
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
          /> 
      ))}
    </main>
  )
}
