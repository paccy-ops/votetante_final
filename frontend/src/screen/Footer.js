import logo from '../images/tante-01.svg'
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer>
      <div className='about'>
        {' '}
        <h3>
          <img className='footer-image' src={logo} alt='logo' />
          <strong>About VoteTante </strong>
        </h3>
        <p>
          Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
          vestibulum. Maecenas faucibus mollis interdum. Etiam porta sem
          malesuada magna mollis euismod. Maecenas faucibus mollis interdum.
        </p>
        <Link to='/login'>
          <button>Get Started</button>
        </Link>

      </div>
      <div className='link'>
        {' '}
        <h3>
          <strong>QUICK LINKS </strong>
        </h3>
        <h5>
          <Link to='/ffoo'>About Us</Link>
        </h5>
        <h5>
          <Link to='/fff'>Service </Link>
        </h5>
        <h5>
          <Link to='/'>Home </Link>
        </h5>
      </div>

      <p className='fo'>Software Design Class Group &#64;2021</p>
    </footer>
  );
};

export default Footer;