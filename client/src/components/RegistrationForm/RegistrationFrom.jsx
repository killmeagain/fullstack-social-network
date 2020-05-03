import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../AuthFormElements/Input/Input';
import Button from '../AuthFormElements/Button/Button';

const RegistrationForm = props => {
  return (
    <form  className="registration-form" onSubmit={props.handleSubmit}>
      <h3 className="registration-form__title">Добро пожаловать!</h3>
      <div className="registration-form__container">
        <div className="registration-form__name">
          <div className="registration-form__firstname">
            <Field theme="gray" type="text" name="firstname" label="Ваше Имя" placeholder="Имя" component={Input} />
          </div>
          <div className="registration-form__lastname">
            <Field theme="gray" type="text" name="lastname" label="Ваша Фамилия" placeholder="Фамилию" component={Input} />
          </div>
        </div>
        <div className="registration-form__email">
          <Field theme="gray" type="text" name="email" label="Ваш email" placeholder="Email" component={Input} />
        </div>
        <div className="registration-form__password">
          <Field theme="gray" type="password" name="password" label="Ваш пароль" placeholder="Пароль" component={Input} />
        </div>
        <Button theme="red" text="Создать Аккаунт" />
      </div>
      {props.error && <div>props.error</div>}
    </form>
  )
}

export default reduxForm({ form: 'registration' })(RegistrationForm);
