const { check, validationResult } = require('express-validator')
const User = require('../models/User');
const bcrypt = require('bcrypt');

const middleware = [
  check('email', 'Введите корректные данные').isEmail(),
  check('password', 'Введите корректные данные')
  .isLength({
    min: 6
  })
];

const registration = async (req, res) => {
  try {
    // Валидируем входящие данный из req
    const errors = validationResult(req);

    // Проверяем, есть ли ошибки
    if (!errors.isEmpty()) return res.status(400).json({
      errors: errors.array(),
      message: 'Введите корректные данные',
      resultCode: 1
    });

    console.log(req.body);

    // Деструктуризируем поля тела запроса
    const {
      email,
      password,
      firstname,
      lastname
    } = req.body;

    // Проверяем, есть ли пользователь с таким email
    const newUser = await User.findOne({
      email
    });

    // Если email занят, то отправляем ошибку
    if (newUser) return res.status(400).json({
      message: 'Такой пользователь уже существует',
      resultCode: 1
    });

    // Если все хорошо, то хэшируем пароль
    const hashPassword = await bcrypt.hash(password, 12);

    // создаем нового пользователя
    const user = User({
      email,
      password: hashPassword,
      firstname,
      lastname
    });

    // Сохраняем нового пользователя
    await user.save();

    // Отвечаем пользователю
    res.status(201).json({
      message: 'Вы успешно зарегестрированы!',
      resulCode: 0
    });

  } catch (error) {
    res.status(500).json({
      message: 'Что-то пошло не так',
      resultCode: 1
    });
  }
}

module.exports = { middleware, registration };
