import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const { name, email, password, password2 } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {

    }
    else {
      const newUser = {
        name,
        email,
        password
      }
      try {
        const config = {
          headers: {
            'content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('/api/users', body, config);
      }
      catch (err) {
        console.error(err.response.data);
      }
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sing Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            placeholder="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Confirm Password"
            name="password2"
            type="password"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/register">Sign In</Link>
      </p>
    </Fragment>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
