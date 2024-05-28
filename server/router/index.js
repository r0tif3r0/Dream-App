const Router = require('express').Router
const userControllers = require('../controllers/user-controllers')
const router = new Router()

const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/login', userControllers.login)
router.post('/logout', userControllers.logout)
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 32}),
    body('userName').isLength({max: 200}),
    userControllers.registration
);
router.get('/activate/:link', userControllers.activate)
router.get('/refresh', userControllers.refresh)
router.get('/users', authMiddleware, userControllers.getUsers)


module.exports = router