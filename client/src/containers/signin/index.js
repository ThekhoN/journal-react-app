import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Redirect} from 'react-router-dom';
import {signinUser} from '../../actions/actionCreators';

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
    </fieldset>);
};

export class Signin extends Component {
  handleFormSubmit ({email, password}) {
    console.log('submitting signin: ', {email, password});
    this.props.handleSigninUser({email, password});
  }
  render () {
    const {handleSubmit, errorMessage, authenticated} = this.props;
    if (authenticated) {
      return (<h2>Authenticated</h2>);
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
        {errorMessage && <span className='error-text'>{errorMessage}</span>}
        <br />
        <button type='submit'>Sign in</button>
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
  return errors;
};

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  handleSigninUser: ({email, password}) => {
    dispatch(signinUser({email, password}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'signin',
  validate
})(Signin));
