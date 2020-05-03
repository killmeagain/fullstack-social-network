const jwt = require('jsonwebtoken');
const config = require('config');

// Прослойка, проверяющая при запросе, авторизирован ли пользователь
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // Получаем токен из заголовков запроса
    const token = req.headers.authorization.split(' ')[1];

    // Проверяем, есть ли в нем токен
    if (!token) {
      res.status(401).json({ message: 'Нет авторизации' });
      return;
    }

    // Если есть, то разкодируем токен
    const verify = jwt.verify(token, config.get('jwt').secret);

    // проверям, чтобы это был access токен
    if (verify.type !== 'access') {
      res.status(400).json({ message: 'Не валидный токен' });
      return;
    }
    // Передаем управление 
    next();

  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'токен просрочен' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Не валидный токен' });
    }
  }
};