import React, { useContext } from 'react';
import AnimationWrapper from '../common/page-animation';
import { Toaster } from 'react-hot-toast';
import { RxCross1 } from 'react-icons/rx';
import { EditorContext } from '../pages/editor.pages';

const PublishForm = () => {
  let {blog: {banner, title, tags, des}, setEditorState } = useContext(EditorContext);

  const handleCloseEvent = () => {
    setEditorState("editor");
  };

  return (
    <AnimationWrapper>
      <section className="relative">
        <Toaster />

        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%] hover:bg-gray-200 rounded-full flex items-center justify-center"
          onClick={handleCloseEvent}
          aria-label="Close Publish Form"
        >
          <RxCross1 size={20} />
        </button>
        <div className=' max-w-[550px] center'>
          <p className='text-dark-grey mb-1'>Preview</p>
          <div className=' w-full aspect-video rounded-lg overflow-hidden bg-gray-50 mt-4'>
            <img src={banner} alt="" />
          </div>
          <h1 className='text-4xl font-medium mt-2 leading-tight line-clamp-2'>{title}</h1>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
