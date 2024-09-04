import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../imgs/logo.png";
import AnimationWrapper from '../common/page-animation';
import defaultBanner from '../imgs/blog banner.png';
import { uploadImage } from '../common/aws';
import { Toaster, toast } from 'react-hot-toast';
import { EditorContext } from '../pages/editor.pages';
import EditorJS from '@editorjs/editorjs';
import { tools } from './tools.component';

const BlogEditor = () => {
  const {
    blog,
    blog: { title, banner, content },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      data: content,
      tools: tools,
      placeholder: "Let's write an awesome story",
    });

    setTextEditor(editor);

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
          setTextEditor(null);
        })
        .catch((err) => console.error("Failed to clean up the editor instance", err));
    };
  }, [content, setTextEditor]); // Ensure dependencies are correct

  const handleBannerUpload = async (e) => {
    const img = e.target.files[0];
    if (!img) return;

    const loadingToast = toast.loading('Uploading...');
    try {
      const url = await uploadImage(img);
      toast.dismiss(loadingToast);
      toast.success("Image uploaded successfully!");
      setBlog((prevBlog) => ({ ...prevBlog, banner: url }));
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("Error uploading image: " + err.message);
    }
  };

  const handleTitleKeyDown = (e) => {

    if (e.key === '13') {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    const input = e.target;
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
    setBlog((prevBlog) => ({ ...prevBlog, title: input.value }));
  };

  const handleError = (e) => {
    e.target.src = defaultBanner;
  };

  const handlePublishEvent = () => {
    if (!blog.banner) return toast.error("Upload a blog banner to publish it");
    if (!blog.title) return toast.error("Write a blog title to publish it");

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog((prevBlog) => ({ ...prevBlog, content: data }));
            setEditorState("Publish");
          } else {
            toast.error("Write something in your blog to publish");
          }
        })
        .catch((err) => console.error("Error saving content:", err));
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to="/" className='flex-none w-10'>
          <img src={logo} alt="Logo" />
        </Link>
        <p className='max-md:hidden text-black line-clamp-1 w-full'>
          {blog.title || "New Blog"}
        </p>
        <div className='flex gap-4 ml-auto'>
          <button className='btn-dark py-2' onClick={handlePublishEvent}>Publish</button>
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
                  onError={handleError}
                  src={blog.banner || defaultBanner} 
                  className='z-20' 
                  alt="Blog Banner" 
                />
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
              value={title || ''}
            ></textarea>

            <hr className='w-full opacity-40 my-5' />

            <div id='textEditor' className='font-gelasio'></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
