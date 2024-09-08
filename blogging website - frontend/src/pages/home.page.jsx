import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from '../components/inpage-navigation.component'
import Loader from '../components/loader.component'

const Homepage = () => {

  let [ blogs, setBlog] = useState(null);

  const fetchLatestBlogs = () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/latest-blogs')
    .then(({ data }) => {
      setBlog(data.blogs)
    })
    .catch (err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchLatestBlogs()
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
              blogs.map((blogs, i) => {
                return <h1 key={i}>{ blogs.title }</h1> 
              })
            }
          </>

            <h1>old Blogs Here</h1>
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
