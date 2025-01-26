import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiUrl } from '../baseUrl';

const Feed = () => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load posts from localStorage when the component mounts
  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts)); // Parse the stored posts and set them in state
    }
  }, []);

  // Update localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('posts', JSON.stringify(posts)); // Save posts to localStorage
    }
  }, [posts]);

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('No file selected!');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload the image to your backend (which will then upload to Cloudinary)
      const res = await axios.post(`${apiUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data',
        
         },
         withCredentials:true
        
      });

      // Receive the Cloudinary URL from your backend and set the image URL
      setImageUrl(res.data.imageUrl); // The Cloudinary URL returned by your backend
    } catch (err) {
      setError('Error uploading image: ' + err.message);
      console.error('Error uploading image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostSubmit = () => {
    if (caption.trim() && imageUrl) {
      const newPost = {
        caption,
        imageUrl,
      };
      const updatedPosts = [newPost, ...posts]; // Add the new post to the list of posts
      setPosts(updatedPosts);
      setCaption('');
      setImageUrl('');
    } else {
      setError('Please provide a caption and an image!');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Feed</h1>

      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Post Input Section */}
      <div className="my-4">
        <textarea
          value={caption}
          onChange={handleCaptionChange}
          className="w-full p-2 border rounded-md"
          placeholder="What's on your mind?"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
        <button
          onClick={handlePostSubmit}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Post'}
        </button>
      </div>

      {/* Display Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded-md shadow-lg">
            <img src={post.imageUrl} alt="Post Image" className="w-full h-64 object-cover rounded-md" />
            <p className="mt-2">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
