import express from 'express';
import userC from '../controller/users.js';
const router = express.Router();

router.get('/save', userC.saveData);
router.get('/find', userC.findData);
router.get('/update', userC.updateData);
router.get('/remove', userC.removeData);

module.exports = router;
