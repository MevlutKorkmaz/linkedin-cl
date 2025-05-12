// src/pages/PublicFeed.jsx

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import CommentSection from "../components/CommentSection";
import axios from "../api/axiosInstance";

export default function PublicFeed() {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  const loadFeed = async () => {
    try {
      const res = await axios.get("/posts/public");
      setPosts(res.data.data.reverse()); // newest first
    } catch (err) {
      alert("Failed to load feed.");
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`/posts/${postId}/like?userId=${userId}`);
      loadFeed();
    } catch {
      alert("Failed to like post.");
    }
  };

  const handleShare = async (postId) => {
    try {
      await axios.post(`/posts/${postId}/share?userId=${userId}`);
      loadFeed();
    } catch {
      alert("Failed to share post.");
    }
  };

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
        <h2>🌍 Public Feed</h2>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: "30px" }}>
              <PostCard post={post} onLike={handleLike} onShare={handleShare} />
              <CommentSection postId={post.id} userId={userId} />
            </div>
          ))
        )}
      </main>
    </div>
  );
}
