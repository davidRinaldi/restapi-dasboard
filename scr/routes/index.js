const { Router } = require ('express');
const router = Router();

const { getUsers, getUserById , createUser, updateUser, deleteUser,loginUser } = require('../controllers/index.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginUser);

module.exports = router;