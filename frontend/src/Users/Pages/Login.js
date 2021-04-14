import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../Action/UserActions';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Login.css';
function Login({ location, history }) {
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo, loading } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      LoginUser(formState.inputs.email.value, formState.inputs.password.value)
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='login-form-part'>
        <div className='container-form'>
          <div className='form-all'>
            <h2>Login Here </h2>
            {error && <Card className='error_message'>{error}</Card>}
            {loading && <LoadingSpinner asOverlay />}
            <Input
              element='input'
              id='email'
              type='email'
              label='E-Mail'
              placeholder='Enter E-mail'
              validators={[VALIDATOR_EMAIL()]}
              errorText='Please enter a valid email address.'
              onInput={inputHandler}
            />
            <Input
              element='input'
              id='password'
              type='password'
              label='Password'
              placeholder='Enter Password'
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText='Please enter a valid password, at least 6 characters.'
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              Login
            </Button>
            <h3>
              New user?
              <Link
                style={{
                  textDecoration: 'none',
                  fontSize: '15px',
                  marginLeft: '5px',
                }}
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
