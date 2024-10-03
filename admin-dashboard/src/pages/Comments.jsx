import { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/all-blogs-comment`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs.');
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div>{error}</div>; // Show error if there is one
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the blogs and render rows */}
          {blogs.map((blog, index) => (
            <tr key={index}>
              <td>{blog.title}</td>
              <td>{blog.des}</td>
              <td>{blog.username}</td>
              <td>
                <ul>
                  {blog.comments.map((comment, idx) => (
                    <li key={idx}>
                      <strong>{comment.username}:</strong> {comment.content}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comments;

