import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import RegistrationFrom from '../RegistrationForm/RegistrationFrom';

import logo from '../../img/logo.png';


const LoginPage = props => {
  const handle = (data) => {
    props.registrationUser(data);

  }
  return (
    <div className="login-page">
      <div className="login-page__logo-container">
        <h1 className="visually-hidden">Страница входа в приложение</h1>
        <section className="login-page__logo">
          <h2 className="visually-hidden">Логотип</h2>
          <img src={logo} alt="Логотип"/>
        </section>
        <section className="login-page__title">
          <h2 className="login-page__main-title">Добро пожаловать в небольшую социальную сеть, в которой можно найти друзей и подруг!</h2>
        </section>
      </div>
      <div className="login-page__registration-container">
        <section className="login-page__login">
          <h2 className="visually-hidden">Авторизация в приложении</h2>
          <LoginForm handle={handle} />
        </section>
        <section className="login-page__registration">
          <h2 className="login-page__title-registration">Нет аккаунта? Вперед создавать!</h2>
          <RegistrationFrom onSubmit={handle} />
        </section>
      </div>
    </div>
    )
}

export default LoginPage;
