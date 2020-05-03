const config = require('config');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Token = require('../models/Token');

// Генерируем Access токен
const generateAT = (userId) => {
  
  // Объявляем данный, которые будем шифровать в токене
  const payload = {
    userId,
    type: config.get('jwt').tokens.access.type
  };

  // Объявляем время жизни токена
  const options = {
    expiresIn: config.get('jwt').tokens.access.expiresIn
  };

  // Возвращаем токен
  return jwt.sign(payload, config.get('jwt').secret, options);
};

// Генерируем Refresh токен
const generateRT = () => {
  
  // Объявляем данный, которые будем шифровать в токене
  const payload = {
    id: uuidv4(),
    type: config.get('jwt').tokens.refresh.type
  };

  // Объявляем время жизни токена
  const options = {
    expiresIn: config.get('jwt').tokens.refresh.expiresIn
  };

  // Возвращаем токен и идентификатор токена
  return {
    id: payload.id,
    token: jwt.sign(payload, config.get('jwt').secret, options)
  };
};

// Функция, обновляющая токен в БД
const replaceRtInMongo = async (tokenId, userId) => {
  try {
    await Token.remove({ userId });
    await Token.create({ tokenId, userId });
  } catch (error) {
    throw Error('Произошла ошибка при обновлении токкена в базе данных');
  }
};

// Экспортируем все функции
module.exports = {
  generateAT,
  generateRT,
  replaceRtInMongo
}