import paco from '../images/paco.jpg';
import joshua from '../images/joshua.jpg';
import keneth from '../images/keneth.jpg'
import bary from '../images/bary.jpg';
import './Team.css';
const Team = () => {
  return (
    <div className='team'>
      <h2>
        Meet{' '}
        <span>
          VoteTante <strong>.</strong>
        </span>{' '}
        Team
      </h2>
      <div>
        <img src={keneth} alt='' />
        <h4>
          Christian <br />
          Kenneth Torres
        </h4>
        <h5>Backend developer</h5>
        <i className='fab fa-facebook-square'></i>
        <i className='fab fa-instagram'></i>
        <i className='fab fa-twitter-square'></i>
        <i className='fab fa-google-plus'></i>
      </div>
      <div>
        <img src={joshua} alt='' />
        <h4>
          Dael Joshua
          <br /> Mangaoang
        </h4>
        <h5>Frontend Developers</h5>
        <i className='fab fa-facebook-square'></i>
        <i className='fab fa-instagram'></i>
        <i className='fab fa-twitter-square'></i>
        <i className='fab fa-google-plus'></i>
      </div>
      <div>
        <img src={bary} alt='' />
        <h4>
          Jhale Barry
          <br />
          Mabanta
        </h4>
        <h5>Backend Developers</h5>
        <i className='fab fa-facebook-square'></i>
        <i className='fab fa-instagram'></i>
        <i className='fab fa-twitter-square'></i>
        <i className='fab fa-google-plus'></i>
      </div>
      <div>
        <img src={paco} alt='' />
        <h4>
          pacifique <br />
          Twagirayesu
        </h4>
        <h5>Member</h5>
        <i className='fab fa-facebook-square'></i>
        <i className='fab fa-instagram'></i>
        <i className='fab fa-twitter-square'></i>
        <i className='fab fa-google-plus'></i>
      </div>
    </div>
  );
};

export default Team;
