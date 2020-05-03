const { check, validationResult } = require('express-validator')
const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authHelher = require('../helpers/authHelpers');

// Функция, которая создает новый токен.
const updateTokens = async (userId) => {
  try {
    
    const accessToken = authHelher.generateAT(userId);
    const refreshToken = authHelher.generateRT();
    
    await authHelher.replaceRtInMongo(refreshToken.id, userId);
    
    return { accessToken, refreshToken };
  } catch (error) {
    throw Error("Что-то пошло не так");
  }
};

// Прослойка валидации роута
const middleware = [
  check('email', 'Введите корректные данные').isEmail(),
  check('password', 'Ввеедите корректные данные').exists()
];

// Обработчик роута авторизации
const auth = async (req, res) => {
  try {
    // Собираем ошибки валидации
    const errors = validationResult(req);

    // Если есть ошибки, то возвращаем массив ошибок
    if (!errors.isEmpty()) return res.status(400).json({
      errors: errors.array()
    });

    // Деструктуризируем тело запроса
    const {
      email,
      password
    } = req.body;

    // Проверяем, есть ли юзер в базе
    const user = await User.findOne({
      email
    });

    if (!user) return res.status(400).json({
      message: 'Пользователь не найден'
    });
    
    // Если есть, то дешифруем пароль и сравниваем
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(400).json({
      message: 'Неверный логин или пароль'
    });

    // Выдаем токен
    const tokens = await updateTokens(user._id);
    res.json(tokens);
    
  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так'
    });
  }
}

// Обработчик роута обновления токена
const refreshTokens = async (req, res) => {
  try {
    // Деструктуризируем тело запроса
    const { refreshToken } = req.body;

    // Декодируем токен
    let payload = jwt.verify(refreshToken, config.get('jwt').secret);

    // Проверяем, являетс ли токен refresh
    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Неверный токен' });
      return;
    }

    // Находим токен в базе данных
    const token = await Token.findOne({ tokenId: payload.id });

    // Если токена нет, выводим ошибку
    if (!token) {
      res.status(400).json({ message: 'Токен не валиден' });
      return;
    }

    // создаем новую пару токенов
    const tokens = await updateTokens(token.userId);

    // Если токены не создались, выбрасываем ошибку
    if(!tokens) {
      throw Error('Что-то пошло не так');
    }

    // Отправляем токены пользователю
    res.json({ tokens });

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Токен просрочен' });
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Токен не валиден' });
      return;
    }

    res.status(500).json({ message: error.message })
  }
}

module.exports = { auth, middleware, refreshTokens }