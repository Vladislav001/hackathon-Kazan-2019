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





router.post('/auth/registration', require('./auth/registration').post);

////**** API ****\\\\

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
router.post('/api/v1/example', require('./api/v1/example').post);

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
router.post('/api/v1/example-upload-file', upload.single('file'), require('./api/v1/example_upload_file').post);

/**
 * @swagger
 * /api/v1/user/registration:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Регистрация пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "email"
 *       in: "x-www-form-urlencoded"
 *       description: "Почта"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "x-www-form-urlencoded"
 *       description: "Пароль"
 *       required: true
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
 *                 id: 1, message: Пользователь с такой почтой уже зарегистрирован
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/v1/user/registration', require('./api/v1/user/registration').post);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - ""
 *     summary: "Авторизация пользователя"
 *     description: ""
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: "email"
 *       in: "x-www-form-urlencoded"
 *       description: "Почта"
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
 *                 id: 2, message: Вы ввели неверную почту или пароль
 *                }
 *              ]
 *            }
 *
 */
router.post('/api/v1/user/login', require('./api/v1/user/login').post);

module.exports = router;
