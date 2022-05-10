import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce
const emailReducer = (prevState, action) => {
  console.log(prevState);
  console.log(action );
  if (action.type === 'USER_INPUT') {
    return {
      ...prevState,
      value: action.emailValue,
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      ...prevState,
      isValid: prevState.value.includes('@'),
    };
  }
  if(action.type === 'USER_INPUTT'){
    return {
      ...prevState,
      valuePass:action.passValue,
    }
  }
  if(action.type === 'USER_BLURR'){
    return {
      ...prevState,
      isPassword:prevState.valuePass.trim().length > 6,
    }
  }
  return {
    value: '',
    isValid: false,
    valuePass:'',
    isPassword:'',
  };
  
};
const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: '',
    valuePass:'',
    isPassword:'',
  });

  const [formIsValid, setFormIsValid] = useState(false); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(emailState.value.includes('@') && emailState.valuePass.trim().length > 6);
    }, 3000);
    // clean up function
    return () => {
      clearTimeout(timer);
    };
  }, [emailState.value, emailState.valuePass]);
  const emailChangeHandler = (event) => {
    
    dispatchEmail({ type: 'USER_INPUT', emailValue: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUTT',passValue:event.target.value})
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };
  const validatePasswordHandler = () => {
    dispatchEmail({type:'USER_BLURR'})
  };
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value,emailState.valuePass);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''}`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${emailState.isPassword === false ? classes.invalid : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={emailState.valuePass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;