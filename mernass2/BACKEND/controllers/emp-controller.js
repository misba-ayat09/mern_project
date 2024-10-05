const express = require('express');
const httpError = require('../model/http-error');
const {v4: uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const HttpError = require('../model/http-error');
const Employee = require('../model/employee');

const createEmployee = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('invalid input passed, please check your data');
    }
    const {fullname,email,position,dateOfBirth,dateOfJoining,salary} = req.body;
    const createEmployee = new Employee({
        fullname:fullname,
        email:email,
        position: position,
        dateOfBirth: dateOfBirth,
        dateOfJoining: dateOfJoining,
        salary: salary
    })
    try{
        await createEmployee.save();
    }catch(err){
        const error = new HttpError('creating employee failed!', 500);
        console.log(err)
        return next(error);
    }
    res.status(201).json({employee: createEmployee});
}

const getAllEmp = async(req,res,next)=>{
    console.log("GET ALL EMPLOYEE DETAILS")
    let employees;
    try{
        employees = await Employee.find();
    }catch(err){
        const error = new HttpError('Failed to fetch employee details', 500);
        return next(error);
    }
    if(!employees || employees.length === 0){
        return next(new HttpError('could not find the employee details', 404))
    }
    res.json({employees:employees.map(employee=>employee.toObject({getters:true}))})
}

const getEmpById = async(req,res,next)=>{
    const empId = req.params.eid;
    let employee;
    try{
        employee = await Employee.findById(empId);
    }catch(err){
        const error = new HttpError('could not find the employe with this id')
        return next(error)
    }
    if(!employee){
        throw new HttpError('something went wrong!. could not find the employee', 500)
    }
    res.json({employee:employee.toObject({getter:true})})
}

const updateEmp = async(req,res,next)=>{
    const {fullname,email} = req.body;
    const empId = req.params.eid;

    let employee;
    try{
        employee = await Employee.findById(empId);
    }catch(err){
        const error = new HttpError("something went wrong!. could not update",500);
        return next(error);
    }
    employee.fullname = fullname;
    employee.email = email;
    try{
        await employee.save();
    }catch(err){
        const error = new HttpError('could not update the details of employee', 500);
        return next(error)
    }
    res.status(200).json({employee:employee.toObject({getter:true})});
    
}

const deleteEmp = async(req,res,next)=>{
    const empId = req.params.eid;
    let employee;
    try{
        employee = await Employee.findById(empId);
        if(!employee){
            const error = new HttpError('could not delete the employee details', 500)
            return next(error);
        }
        await employee.deleteOne()
    }catch(err){
        const error = new HttpError('could not find the employee with the given id',500)
        return next(error)
    }
    res.status(200).json({message: 'deleted successfully!....'})
}


exports.deleteEmp = deleteEmp;
exports.updateEmp = updateEmp;
exports.getEmpById = getEmpById;
exports.getAllEmp = getAllEmp;
exports.createEmployee=createEmployee;
