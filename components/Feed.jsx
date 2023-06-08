"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const searchPrompt = async (search) => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    const filteredPost = data.filter(
      (post) =>
        post.prompt.includes(search) ||
        post.tag.includes(search) ||
        post.creator.userName.includes(search) ||
        post.creator.userName.includes(search.toUpperCase()) ||
        post.creator.email.includes(search)
    );

    setPosts(filteredPost);
  };

  const handleSearchChange = async (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    searchPrompt(e.target.value);
  };

  const handleTagClick = (tag) => {
    // setSearchText(tag.toString());
    // searchPrompt(tag.toString());
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPost();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
