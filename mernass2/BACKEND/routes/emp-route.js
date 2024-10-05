const express = require('express');
const httpError = require('../model/http-error');
const router = express.Router();
const {check} = require('express-validator');
const empContollers = require('../controllers/emp-controller');

router.post('/', [
    check('fullname').notEmpty(),
    check('email').notEmpty(),
    check('position').notEmpty(),
    check('dateOfBirth').notEmpty(),
    check('salary').notEmpty(),
], empContollers.createEmployee);
router.get('/', empContollers.getAllEmp);
router.get('/:eid', empContollers.getEmpById);
router.patch('/:eid', empContollers.updateEmp);
router.delete('/:eid', empContollers.deleteEmp);
module.exports = router;