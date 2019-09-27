const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const multer = require('multer');
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
 * /api/web/v1/poll/create_poll:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Создание опроса"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - title: "title"
 *       text: "text"
 *       image: "image file"
 *       video: "video href"
 *       geo: {
 *              "latitude": "latitude",
 *              "longitude": "longitude"
 *              }
 *       date_created: "date created",
 *       questions: [
 * 	        {
 *  		    "title": "str1",
 * 		        "type": "type1",
 *		        "options": ["Ford", "BMW", "Fiat"]
 *	        }]
 *     responses:
 *       200:
 *        description: ''
 *        examples:
 *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
 *       403:
 *         description: ''
 *         examples:
 *           application/json:
 *            {
 *              errors:
 *              [
 *                {
 *
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/web/v1/poll/create', upload.single('file'), require('./api/web/v1/poll/create').post);
////**** WEB API END****\\\\


////**** MOBILE API START****\\\\
/**
 * @swagger
 * /api/v1/mobile/user/registration:
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
