import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.post('/createUser', controller.createUser);
router.post('/getUser', controller.getUser);
router.get('/getUsers', controller.getUsers);
router.post('/changeUsername', controller.changeUsername);
router.post('/changePassword', controller.changePassword);
router.post('/deleteUser', controller.deleteUser);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/isLoggedIn', controller.checkSession);
router.post('/invite', controller.invite);
router.post('/getInvites', controller.getInvites);
router.post('/invitesSeen', controller.invitesSeen);
router.post('/declineInvite', controller.declineInvite);

export = router;
