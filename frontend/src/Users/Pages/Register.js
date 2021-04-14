import React, { useEffect, useState } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './Register.css';
import { RegisterUser } from '../../Action/UserActions';
function Register({ location, history }) {
  const [message, setMessage] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, userInfo, loading } = userRegister;

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
      passwordConfirm: {
        value: '',
        isValid: false,
      },
      name: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    if (
      formState.inputs.password.value !== formState.inputs.passwordConfirm.value
    ) {
      setMessage('Password do not match');
    } else {
      dispatch(
        RegisterUser(
          formState.inputs.name.value,
          formState.inputs.email.value,
          formState.inputs.password.value,
          formState.inputs.passwordConfirm.value
        )
      );
    }
  };
  return (
    <form onSubmit={registerSubmitHandler}>
      <div className='login-form-register'>
        <div className='container-form'>
          <div className='form-all'>
            <h2>Register With Us </h2>
            {message && <Card className='error_message'>{message}</Card>}
            {error && <Card className='error_message'>{error}</Card>}
            {loading && <LoadingSpinner asOverlay />}
            <Input
              element='input'
              id='name'
              type='text'
              label='Name'
              placeholder='Enter Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Name Required'
              onInput={inputHandler}
            />
            <Input
              element='input'
              id='email'
              type='email'
              label='E-Mail'
              placeholder='Enter E-Mail'
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
            <Input
              element='input'
              id='passwordConfirm'
              type='password'
              label='Confirm Password'
              placeholder='Enter Password again'
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Password don't match"
              onInput={inputHandler}
            />
            <Button type='submit' disabled={!formState.isValid}>
              Register
            </Button>

            <h3
              style={{
                fontSize: '15px',
              }}>
              Already have an Account?
              <Link
                style={{
                  textDecoration: 'none',
                  fontSize: '20px',
                  marginLeft: '5px',
                }}
                to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login
              </Link>
            </h3>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
