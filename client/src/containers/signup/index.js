import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signupUser} from '../../actions/actionCreators';
import {Redirect} from 'react-router-dom';

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: {touched, error}
  }) => {
  return (
    <fieldset>
      <input
        {...input}
        name={label}
        placeholder={placeholder}
        type={type}
      />
      {touched && error && <span className='error-text'>{error}</span>}
    </fieldset>
  );
};

export class Signup extends Component {
  handleFormSubmit ({email, password}) {
    console.log('submitting signup: ', {email, password});
    this.props.handleSignupUser({email, password});
  }
  render () {
    const {handleSubmit, errorMessage, authenticated} = this.props;
    if (authenticated) {
      console.log('authenticated, you have successfully signed up!');
    }
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          type='text'
          name='email'
          placeholder='email'
          component={renderField}
          label='email'
        />
        <Field
          type='password'
          name='password'
          placeholder='password'
          component={renderField}
          label='password'
        />
        <Field
          type='password'
          name='passwordConfirm'
          placeholder='confirm password'
          component={renderField}
          label='confirm password'
        />
        {errorMessage && <span className='error-text'>{errorMessage}</span>}
        <br />
        <button
          action='submit'
          type='submit'
          >Sign up</button>
      </form>
    );
  }
}

const validate = (formProps) => {
  let errors = {};
  if (!formProps.email) {
    errors.email = 'Required';
  }
  if (!formProps.password) {
    errors.password = 'Required';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Password should match!';
  }
  return errors;
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  handleSignupUser: ({email, password}) => {
    dispatch(signupUser({email, password}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signup',
  validate
})(Signup));
