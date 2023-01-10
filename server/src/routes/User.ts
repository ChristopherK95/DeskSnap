import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/createUser', controller.createUser);
router.get('/getUser/:userId', controller.readUser);
router.get('/getUsers', controller.readAllUsers);
router.patch('/updateUser', controller.updateUser);
router.delete('/deleteUser/:userId', controller.deleteUser);

export = router;
