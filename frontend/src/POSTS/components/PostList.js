import PostItem from './PostItem';
import './PostList.css';
import React from 'react';
const PostList = ({ allPosts }) => {
  if (allPosts.length === 0) {
    return (
      <div className='application-center'>
        <h1>No Post to show </h1>
      </div>
    );
  }

  return (
    <div className='post-active'>
      <h1>Available Post to apply</h1>
      <ul className='posts-list'>
        {allPosts.map((post) => (
          <PostItem
            key={post.id}
            id={post.id}
            image={post.post_image}
            title={post.title}
            applications={post.candidates.length}
            description={post.description}
            active={post.isActive}
          />
        ))}
      </ul>
    </div>
  );
};

export default PostList;
