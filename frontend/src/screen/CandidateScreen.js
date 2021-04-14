import './candidate.css';
import leftCover from '../images/apply.svg';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import React from "react";

const CandidateScreen = () => {
  
  return (
    <div>
      <div className='left-cover'>
        <img src={leftCover} alt='' />
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean
          lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus
          sit amet fermentum. Donec ullamcorper nulla non metus auctor
          fringilla. Cras mattis
          <Link
            style={{
              textDecoration: 'none',
            }}
            to='/apply'>
            <Button className='register'>Apply Now</Button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CandidateScreen;