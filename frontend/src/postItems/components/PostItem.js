import React from 'react';

import './PlaceItem.css';

const PostItem = ({ items }) => {
  return (
    <React.Fragment>
      <div className='post-item'>
        <div className='cols grid__col4'>Image </div>
        <div className='cols grid__col3'>
          <h1>{items.title}</h1>
          <h3>
            <span>
              {items.numCandidates}{' '}
              {items.numCandidates === '1' ? 'Candidate' : 'Candidates'}
            </span>
          </h3>
          <h5>{items.description}</h5>
        </div>
        <div className='cols grid__col5'>Candidates</div>
      </div>
    </React.Fragment>
  );
};

export default PostItem;
