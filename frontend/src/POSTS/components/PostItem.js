import { Link, NavLink, withRouter } from 'react-router-dom';
import './PostItem.css';
import imagePost from '../../images/gunnar.jpg';

import React from 'react';
const PostItem = (props) => {
  const { active, applications, description, title, id } = props;
  return (
    <div>
      {active ? (
        <div className='posts'>
          <NavLink to={``}>
            <div className='description'>
              <img src={imagePost} alt={title} />
              <h4>{title}</h4>
              <h6>
                {' '}
                {applications === 1 ? 'Application' : 'Applications'} :
                <span
                  style={{
                    color: applications === 5 ? '#fcc102' : 'green',
                  }}>
                  {applications}
                </span>
              </h6>
              <h6>
                Post:
                {
                  <span
                    style={{
                      color: applications === 5 ? 'red' : '#fcc102',
                    }}>
                    {applications === 5 ? 'Closed' : 'open'}
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
              <p>{description.slice(0, 60)}</p>
              <Link to={`/post/${id}`}>
                {' '}
                <button>More info</button>
              </Link>
            </div>
          </NavLink>
        </div>
      ) : (
        <div className='application-center'>
          <h1> NO Available Post </h1>
        </div>
      )}
    </div>
  );
};

export default withRouter(PostItem);
