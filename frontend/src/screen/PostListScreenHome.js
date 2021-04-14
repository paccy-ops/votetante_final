import { Link, NavLink, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { listPosts } from '../Action/PostActions';
import Card from '../shared/components/UIElements/Card';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
const PostListScreenHome = () => {
  const dispatch = useDispatch();

  const postList = useSelector((state) => state.postList);

  const { error, loading, posts } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch, posts]);

  if (posts.length === 0) {
    return (
      <div className='application-center'>
        <h1>No Post to show </h1>
      </div>
    );
  }

  return (
    <div className='posts-list'>
      <div className='post-active'>
        {error && <Card>{error}</Card>}
        {loading && <LoadingSpinner asOverlay />}
        {posts.map((post) => (
          <div key={post.id}>
            {post.active ? (
              <div className='posts'>
                <NavLink to={``}>
                  <div className='description'>
                    <img src={post.post_image} alt={post.title} />
                    <h4>{post.title}</h4>
                    <h6>
                      {' '}
                      {post.candidates.length === 1
                        ? 'Application'
                        : 'Applications'}{' '}
                      :
                      <span
                        style={{
                          color:
                            post.candidates.length === 5 ? '#fcc102' : 'green',
                        }}>
                        {post.candidates.length}
                      </span>
                    </h6>
                    <h6>
                      Post:
                      {
                        <span
                          style={{
                            color:
                              post.candidates.length === 5 ? 'red' : '#fcc102',
                          }}>
                          {post.candidates.length === 5 ? 'Closed' : 'open'}
                        </span>
                      }
                    </h6>
                    <span
                      style={{
                        marginRight: '10px',
                        color: 'seagreen',
                      }}>
                      Description:
                    </span>
                    <p>{post.description.slice(0, 60)}</p>
                    <Link to={`/post/${post.id}`}>
                      {' '}
                      <button>More info</button>
                    </Link>
                  </div>
                </NavLink>
              </div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRouter(PostListScreenHome);
