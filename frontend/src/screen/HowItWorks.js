import './HowItworks.css';
import processing from '../images/processing.svg';
import Resume from '../images/Resume.svg';
import voting from '../images/voting.svg';
import { Link } from 'react-router-dom';
import React from 'react';
const HowItWorks = () => {
  return (
    <div className='container'>
      <div className=' how-it-works '>
        <h1>HOW IT WORKS</h1>
        <div>
          <Link to='/register'>
            {' '}
            <img src={processing} alt='' />
          </Link>
          <Link to='/register'>
            {' '}
            <h5>Register</h5>
          </Link>
        </div>
        <div>
          {' '}
          <img src={Resume} alt='' /> <h5>Apply for a Job</h5>{' '}
        </div>
        <div>
          {' '}
          <img src={voting} alt='' /> <h5>Cast your vote</h5>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
