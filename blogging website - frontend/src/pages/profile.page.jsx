import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimationWrapper from '../common/page-animation';
import Loader from '../components/loader.component';
import { toast } from 'react-hot-toast';
import { UserContext } from '../App';
import AboutUser from '../components/about.component';

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: ""
};

const ProfilePage = () => {
  const { id: profileId } = useParams();
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);

  // Check if profile is not null before destructuring
  const {
    personal_info: { fullname, username: profile_username, profile_img, bio } = {},
    account_info: { total_posts, total_reads } = {},
    social_links,
    joinedAt,
  } = profile || profileDataStructure; // Default to an empty structure if profile is null

  let { userAuth: { username } } = useContext(UserContext)

  const fetchUserProfile = async () => {
    try {
      const { data: user } = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/get-profile`, { username: profileId });
      if (user) {
        setProfile(user);
      } else {
        toast.error("User profile not found.");
      }
    } catch (error) {
      toast.error("Failed to load user profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [profileId]);

  const resetState = () => {
    setProfile(profileDataStructure);
    setLoading(true)
  }

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <section className='h-cover md:flex flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12'>
          <div className='flex flex-col max-md:items-center gap-5 min-w-[250px]'>
            <img
              className='w-48 h-48 bg-grey rounded-full md:w-32 md:h-32 object-cover'
              src={profile_img || '/path/to/default/profile.png'}
              alt={fullname || 'Profile'}
            />
            <h1 className='text-2xl font-medium'>@{profile_username || 'Unknown'}</h1>
            <p className='text-xl capitalize h-6'>{fullname || 'Unknown User'}</p>
            <p>
              {total_posts?.toLocaleString() || 0} Blogs - {total_reads?.toLocaleString() || 0} Reads
            </p>
            <div className='flex gap-4 mt-2'>
            {
                profileId == username ? <Link to="/settings/edit-profile" className='btn-light rounded-md'>
                Edit Profile
              </Link>
              : " "
            }
            </div>
            <AboutUser className="max-md:hidden" bio={bio} social_links={social_links} joinedAt={joinedAt}/>
          </div>
        </section>
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
