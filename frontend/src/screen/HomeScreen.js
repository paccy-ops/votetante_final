import resister from '../images/processing.svg'
import Button from '@material-ui/core/Button';
import './HomeScreen.css'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'

const HomeView = ({history}) => {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin
  
  return (
    <div>
      <div className='left-cover'>
        {' '}
        <img src={resister} alt='imag' />
        <p>
          <strong>
            {' '}
            Why you should use <br /> VoteTante?
          </strong>{' '}
          <br />
          Enables voters to cast their vote privately and easily from any
          location and on any device with Internet access (PC, tablet,
          smartphone, etc.), ensuring maximum election engagement by enabling
          remote and disabled voters to participate on equal terms.
          {!userInfo &&(

            <Link
            style={{
              textDecoration: 'none',
            }}
            to='/register'>
            
            <Button className='register'>Register Now</Button>
          </Link>
          )
          
          
          }
        </p>
      </div>
    </div>

  );
};



export default HomeView;
