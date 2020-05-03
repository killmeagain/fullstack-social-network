import React from 'react';

const Button = ({text, theme}) => {
    return (
      <button className={(theme === "red" || theme === "white") && `button button_theme-${theme}`}>{text}</button>
    )
}

export default Button;
