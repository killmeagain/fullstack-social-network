import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../AuthFormElements/Input/Input';
import Button from '../AuthFormElements/Button/Button';

const LoginForm = props => {
  return (
    <form className="login-form" onSubmit={props.handle}>
      <div className="login-form__email">
        <Field theme="light" type="text" name="email" label="Ваш email" placeholder="Введите ваш email" component={Input} />
      </div>
      <div className="login-form__password">
        <Field theme="light" type="password" name="password" label="Ваш email" placeholder="Введите ваш пароль" component={Input} />
      </div>
      <div className="login-form__button">
        <Button theme="white" text="Войти" />
      </div>
    </form>
  )
}

export default reduxForm({ form: 'login' })(LoginForm);
