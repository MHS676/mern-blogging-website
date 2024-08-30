import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../imgs/logo.png";
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png';
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { EditorContext } from '../pages/editor.pages';  // Make sure the import path is correct

const BlogEditor = () => {
  // const blogBannerRef = useRef();
  let { blog, blog:{title, banner, content, tags, des}, setBlog } = useContext(EditorContext);

  // console.log(blog);

  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];

    if (img) {
      const loadingToast = toast.loading('Uploading...');

      try {
        const url = await uploadImage(img);
        if (url) {
          toast.dismiss(loadingToast);
          toast.success("Image uploaded successfully!");
          setBlog({ ...blog, banner: url });
        }
      } catch (err) {
        toast.dismiss(loadingToast);
        toast.error("Error uploading image: " + err.message);
      }
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
    setBlog({ ...blog, title: input.value });
  };

  const handleError = (e) => {
    let img = e.target;

    img.src = defaultBanner;
  }

  return (
    <>
      <nav className='navbar'>
        <Link to="/" className='flex-none w-10 '>
          <img src={logo} alt="Logo" />
        </Link>
        <p className='max-md:hidden text-black line-clamp-1 w-full '>
          {blog.title.length ? blog.title : "New Blog"}
        </p>
        <div className='flex gap-4 ml-auto'>
          <button className='btn-dark py-2'>Publish</button>
          <button className='btn-light py-2'>Save Draft</button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className='mx-auto max-w-[900px] w-full'>
            <div className='relative aspect-video bg-white hover:opacity-80 border-4 border-grey'>
              <label htmlFor="uploadBanner">
                <img 
                // ref={blogBannerRef} 
                onError={handleError}
                src={banner} className='z-20' alt="Default Banner" />
                <input
                  id='uploadBanner'
                  type='file'
                  accept='.png, .jpg, .jpeg'
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder='Blog Title'
              className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40'
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr  className=' w-full opacity-40 my-5'/>

          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
