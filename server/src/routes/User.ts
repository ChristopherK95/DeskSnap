import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/createUser', controller.createUser);
router.post('/getUser', controller.getUser);
router.get('/getUsers', controller.getUsers);
router.post('/getChannels', controller.getChannels);
router.post('/updateUser', controller.updateUser);
router.delete('/deleteUser', controller.deleteUser);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/isLoggedIn', controller.checkSession);

export = router;
