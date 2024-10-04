import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // For pagination

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/all-blogs`, {
          page,
        });
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]); // Re-fetch when page changes

  const handleDelete = (blogId) => {
    // Implement delete functionality here
    console.log('Delete blog with ID:', blogId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-x-auto mx-28 mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No.</th>
            <th>Blog Name</th>
            <th>Publishing Date</th>
            <th>Manage</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id} className="bg-base-200">
              <th>{(page - 1) * 5 + index + 1}</th>
              <td>{blog.title}</td>
              <td>{new Date(blog.publishedAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary">Approve</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(blog._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-outline"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
