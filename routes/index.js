const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const multer = require('multer');
const verifyToken = require('../middleware/verify_token');
const isAdmin = require('../middleware/is_admin');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const fileFilter = function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 мб
    },
    //fileFilter: fileFilter
});


// swagger definition
const swaggerDefinition = require('../swagger.json');

// options for the swagger docs
const options = {
// import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
// path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// serve swagger
router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

////**** WEB API START****\\\\

/**
 * @swagger
 * /api/web/v1/user/login:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Авторизация пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "phone"
 *       in: "x-www-form-urlencoded"
 *       description: "Телефон"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "x-www-form-urlencoded"
 *       description: "Пароль"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *        description: Пользователь успешно авторизован
 *        examples:
 *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
 *       401:
 *         description: Введены неверные данные
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *                 id: 2, message: Вы ввели неверный телефон или пароль
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/web/v1/user/login', require('./api/web/v1/user/login').post);

/**
 * @swagger
 * /api/web/v1/poll/create:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Создание опрос"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "title"
 *       in: "x-www-form-urlencoded"
 *       description: "Заголовок опроса"
 *       required: true
 *       type: "string"
 *     - name: "text"
 *       in: "x-www-form-urlencoded"
 *       description: "Тело опроса"
 *       type: "string"
 *     - name: "video"
 *       in: "x-www-form-urlencoded"
 *       description: "Ссылка на видео"
 *       type: "string"
 *     - name: "geo"
 *       in: "x-www-form-urlencoded"
 *       description: "Формат: geo {latitude, longitude}"
 *       type: "object"
 *     - name: "date_created"
 *       in: "x-www-form-urlencoded"
 *       description: "Дата создания опроса"
 *       type: "String"
 *     - name: "image"
 *       in: "x-www-form-urlencoded"
 *       description: "Картинка"
 *       type: "file"
 *     - name: "question"
 *       in: "x-www-form-urlencoded"
 *       description: "Массив объектов вопросов с полями title, type(select/rating), options(массив возможных ответов)"
 *       type: "array"
 *     - name: "is_company"
 *       in: "x-www-form-urlencoded"
 *       description: "Компания ли"
 *       type: "Number"
 *     - name: "age"
 *       in: "x-www-form-urlencoded"
 *       description: "Возраст формата { min, max}"
 *       type: "Object"
 *     - name: "gender"
 *       in: "x-www-form-urlencoded"
 *       description: "Пол"
 *       type: "String"
 *     - name: "location"
 *       in: "x-www-form-urlencoded"
 *       description: "Место опроса"
 *       type: "String"
 *     responses:
 *       200:
 *        description: ''
 *       403:
 *         description: Введены неверные данные
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *                "id": 1, "title":Не заполнены обязательные поля, "detail": "Пустое значение токена"
 *                },{
 *                "id": 2, "code": token-Invalid, "title":Введены неверные данные, "detail": "Введен неверный токен, или срок действия токена истек"
 *                },{
 *                "id": 2, "token": token-Invalid, "title":Введены неверные данные, "detail": "Пользователь с введенным токеном был удален"
 *                }       
 *              ]
 *            }
 *
 */
router.post('/api/web/v1/poll/create', verifyToken, isAdmin, upload.single('file'), require('./api/web/v1/poll/create').post);

router.post('/api/web/v1/poll/update', verifyToken, isAdmin, upload.single('file'), require('./api/web/v1/poll/update').post);
////**** WEB API END****\\\\


////**** MOBILE API START****\\\\
/**
 * @swagger
 * /api/mobile/v1/user/registration:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Регистрация пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "phone"
 *       in: "x-www-form-urlencoded"
 *       description: "Телефон"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "x-www-form-urlencoded"
 *       description: "Пароль"
 *       required: true
 *       type: "string"
 *     - name: "nickname"
 *       in: "x-www-form-urlencoded"
 *       description: "Никнейм"
 *       type: "string"
 *     - name: "firebase_token"
 *       in: "x-www-form-urlencoded"
 *       description: "Firebase токен"
 *       required: false
 *       type: "string"
 *     - name: "is_company"
 *       in: "x-www-form-urlencoded"
 *       description: "Компания? - 0 или 1"
 *       required: true
 *       type: "number"
 *     - name: "company"
 *       in: "x-www-form-urlencoded"
 *       description: "Название компании"
 *       required: false
 *       type: "string"
 *     - name: "fio"
 *       in: "x-www-form-urlencoded"
 *       description: "ФИО"
 *       required: false
 *       type: "string"
 *     - name: "gender"
 *       in: "x-www-form-urlencoded"
 *       description: "Название компании"
 *       required: false
 *       type: "string"
 *     - name: "age"
 *       in: "x-www-form-urlencoded"
 *       description: "Возраст"
 *       required: false
 *       type: "number"
 *     - name: "location"
 *       in: "x-www-form-urlencoded"
 *       description: "Локация"
 *       required: false
 *       type: "string"
 *     responses:
 *       200:
 *        description: Пользователь успешно зарегистрирован
 *        examples:
 *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
 *       401:
 *         description: Введены неверные данные
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *                 id: 1, message: Пользователь с таким телефоном уже зарегистрирован
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/mobile/v1/user/registration', require('./api/mobile/v1/user/registration').post);

/**
 * @swagger
 * /api/mobile/v1/user/login:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Авторизация пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "phone"
 *       in: "x-www-form-urlencoded"
 *       description: "Телефон"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "x-www-form-urlencoded"
 *       description: "Пароль"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *        description: Пользователь успешно авторизован
 *        examples:
 *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
 *       401:
 *         description: Введены неверные данные
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *                 id: 2, message: Вы ввели неверную телефон или пароль
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/mobile/v1/user/login', require('./api/mobile/v1/user/login').post);

/**
 * @swagger
 * /api/mobile/v1/user/update:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Обновление данных пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "nickname"
 *       in: "x-www-form-urlencoded"
 *       description: "Никнейм"
 *       type: "string"
 *     - name: "company"
 *       in: "x-www-form-urlencoded"
 *       description: "Название компании"
 *       type: "string"
 *     - name: "fio"
 *       in: "x-www-form-urlencoded"
 *       description: "ФИО"
 *       type: "string"
 *     - name: "gender"
 *       in: "x-www-form-urlencoded"
 *       description: "Пол"
 *       type: "string"
 *     - name: "age"
 *       in: "x-www-form-urlencoded"
 *       description: "Возраст"
 *       type: "number"
 *     - name: "location"
 *       in: "x-www-form-urlencoded"
 *       description: "location"
 *       type: "Локация"
 *     responses:
 *       200:
 *        description: Пользователь успешно обновлен
 *       403:
 *         description: Введены неверные данные
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *                "id": 1, "title":Не заполнены обязательные поля, "detail": "Пустое значение токена"
 *                },{
 *                "id": 2, "code": token-Invalid, "title":Введены неверные данные, "detail": "Введен неверный токен, или срок действия токена истек"
 *                },{
 *                "id": 2, "token": token-Invalid, "title":Введены неверные данные, "detail": "Пользователь с введенным токеном был удален"
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/mobile/v1/user/update', verifyToken, require('./api/mobile/v1/user/update').post);


// examples

/**
 * @swagger
 * /api/v1/example:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Example API"
 *     description: ""
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *        description: Example data
 *        examples:
 *           application/json: { "_id": "5d1bab42042e52e0444e81af", "name": "some" }
 */
router.post('/api/v1/example', require('./api/mobile/v1/example').post);

/**
 * @swagger
 * /api/v1/example-upload-file:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Example upload file"
 *     description: ""
 *     produces:
 *       - form-data
 *     parameters:
 *     - name: "id"
 *       in: "form-data"
 *       description: "ID записи"
 *       required: true
 *       type: "string"
 *     - name: "file"
 *       in: "form-data"
 *       description: "Файл для загрузки"
 *       required: true
 *       type: "file"
 *     responses:
 *       200:
 *        description: Example data
 *        examples:
 *           application/json: { }
 */
router.post('/api/v1/example-upload-file', upload.single('file'), require('./api/mobile/v1/example_upload_file').post);


////**** MOBILE API END****\\\\

module.exports = router;
