import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from '../components/inpage-navigation.component'
import Loader from '../components/loader.component'
import BlogPostCard from '../components/blog-post.component'
import MinimalBlogPost from '../components/nobanner-blog-post.component'

const Homepage = () => {

  let [ blogs, setBlog] = useState(null);
  let [ trendingBlogs, setTrendingBlog] = useState(null);

  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/latest-blogs')
    .then(({ data }) => {
      setBlog(data.blogs)
    })
    .catch (err => {
      console.log(err)
    })
  }
  const fetchTrendingBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/trending-blogs')
    .then(({ data }) => {
      setTrendingBlog(data.blogs)
    })
    .catch (err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchLatestBlogs()
    fetchTrendingBlogs()
  })

  return (
    <AnimationWrapper>
    
      <section className=' h-cover flex justify-center gap-10'>
      {/* latest blog */}
        <div className=' w-full'>
          <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
            
          <>
            {
              blogs === null ? <Loader /> :
              blogs.map((blog, i) => {
                return <AnimationWrapper key={i} transition={{ duration: 1 , delay:i*.1 }}>
                  <BlogPostCard content={blog} author={blog.author.personal_info}/>
                </AnimationWrapper>
              })
            }
          </>

            <>
              {
              trendingBlogs === null ? <Loader /> :
              trendingBlogs.map((blog, i) => {
                return <AnimationWrapper key={i} transition={{ duration: 1 , delay:i*.1 }}>
                  <MinimalBlogPost blog={blog} index={i}/>
                </AnimationWrapper>
              })
            }
            </>
          </InPageNavigation>
        </div>

        {/* filters and trending blog */}
        <div>

        </div>
      </section>
    </AnimationWrapper>
  )
}

export default Homepage
