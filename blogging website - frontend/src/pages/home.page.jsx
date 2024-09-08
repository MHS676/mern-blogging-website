import React from 'react'
import AnimationWrapper from '../common/page-animation'
import InPageNavigation from '../components/inpage-navigation.component'

const Homepage = () => {
  return (
    <AnimationWrapper>
    
      <section className=' h-cover flex justify-center gap-10'>
      {/* latest blog */}
        <div className=' w-full'>
          <InPageNavigation routes={["home", "trending blogs"]} defaultHidden={["trending blogs"]}>
            <h1>Latest Blogs Here</h1>
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
