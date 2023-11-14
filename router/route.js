const express = require('express');
const router = express.Router();

const { 
    SignUp, 
    LoginIn,
    authMiddleware,
} = require('../controllers/UserController');

const { 
    CreateClass, 
    AddSubject, 
    GetClass, 
    GetSingleClass,
    AddChapter,
} = require('../controllers/ClassController');

// User Routes

router.post('/signup', SignUp);
router.post('/login', LoginIn);

// Class Routes
router.post('/createClass',CreateClass);
router.patch('/updateClass/:id', AddSubject)
router.get('/getClasses', GetClass)
router.get('/getSingleClass/:classId/:subId', GetSingleClass)
router.patch('/updateClass/:classId/:subId', AddChapter)


module.exports = router;