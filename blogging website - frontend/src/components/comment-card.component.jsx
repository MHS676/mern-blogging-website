import React, { useContext, useState } from 'react'
import { getDay } from '../common/date'
import {UserContext} from '../App'
import toast from 'react-hot-toast'
import CommentField from './comment-field.component'

const CommentCard = ({ index, leftVal, commentData }) => {

    let { commented_by: { personal_info: { profile_img, fullname, username } }, commentedAt, comment, _id } = commentData

    let { userAuth: { access_token } } = useContext(UserContext)

    let [ isReplying, setReplying ] = useState(false)

    const handleReplyClick = () => {

      if(!access_token) {
        return toast.error("login first to leave a reply")
      }

      setReplying(preVal => !preVal);

    }

  return (
    <div className=' w-full' style={{ paddingLeft: `${leftVal * 10}px` }}>
      <div className=' my-5 p-6 rounded-md border border-grey '>
            <div className='flex gap-3 items-center mb-8'>
                <img src={profile_img} className='w-6 h-6 rounded-full' alt="" />
                <p className='line-clamp-1'>{fullname} @{username}</p>
                <p className='min-w-fit'>{getDay(commentedAt)}</p>
            </div>
            <p className='font-gelasio text-xl ml-3'>{comment}</p>

            <div className=' font-gelasio g-5 items-center ml-3'>
              <button onClick={handleReplyClick} className=' underline'>Reply</button>
            </div>

            {
              isReplying ?
              <div className='mt-8'>
                <CommentField index={index} replyingTo={_id} setReplying={setReplying}  action="reply" />
              </div> : ""
            }

      </div>
    </div>
  )
}

export default CommentCard
