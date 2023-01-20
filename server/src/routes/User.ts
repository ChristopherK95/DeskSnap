import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/createUser', controller.createUser);
router.post('/getUser', controller.getUser);
router.get('/getUsers', controller.getUsers);
router.post('/updateUser', controller.updateUser);
router.delete('/deleteUser', controller.deleteUser);
router.post('/login', controller.login);

export = router;
