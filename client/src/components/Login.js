import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({});

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  };

  //console.log(creds);

  const userlogin = e => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/api/login`, creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        //this.props.history.push('/route');
      })
      .catch(err => {
        console.log(err);
      });

  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input 
          type='text'
          name='username'
          placeholder="User Name"
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;
