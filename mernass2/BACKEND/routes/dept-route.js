const express = require('express');
const httpError = require('../model/http-error');

const router = express.Router();
const {check} = require('express-validator');
const deptContollers = require('../controllers/dept-contoller');
router.post('/',[check('name').notEmpty()],deptContollers.createDepartment);
router.get('/departments', deptContollers.getAllDept);
router.get('/departments/:did', deptContollers.getDeptById);
router.patch('/departments/:did', deptContollers.updateDept);
router.delete('/department/:did', deptContollers.deleteDept);

module.exports = router;