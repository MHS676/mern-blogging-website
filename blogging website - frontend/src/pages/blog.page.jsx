import React from 'react'
import { useParams } from 'react-router-dom'

const BlogPage = () => {

    let { blog_id } = useParams()

  return (
    <div>
      <h1>this is  a  blog page for {blog_id}</h1>
    </div>
  )
}

export default BlogPage
