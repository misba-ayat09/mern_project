const express = require('express');
const httpError = require('../model/http-error')
const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require('../model/http-error');
const Department = require('../model/department');


const createDepartment = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError('invalid inputs passed, please checm your data');
    }
    const {name} = req.body
    const createDepartment = new Department({
        name: name
    })
    try{
        await createDepartment.save();
    }catch(err){
        const error = new HttpError('creating department failed!', 500)
        return next(error)
    }
    res.status(201).json({department: createDepartment});
}

const getAllDept = async(req,res,next)=>{
    console.log("GET ALL DEPARTMENT NAME")
    let departments;
    try{
        departments= await Department.find();
    }catch(err){
        const error = new HttpError('something went wrong!, could not find departments')
        return next(error);
    }
    if(!departments || departments.length === 0){
        return next(new HttpError('could not find the departments', 404))
    }
    res.json({departments:departments.map(department=>department.toObject({getter:true}))});
};

const getDeptById = async(req,res,next)=>{
    const deptId = req.params.did;

    let department;
    try{
        department = await Department.findById(deptId);
    }catch(err){
        const error = new HttpError('something went wrong!, could not find department id');
        return next(error);
    }
    if(!department){
        throw new HttpError('could not find department with given id', 404);
    }
    res.json({department:department.toObject({getters:true})})
}

const updateDept = async(req,res,next)=>{
    const {name} = req.body;
    const deptId = req.params.did;

    let department;
    try{
        department = await Department.findById(deptId)
    }catch(err){
        const error = new HttpError('something went wrong!, could not find department id',500);
        return next(error);
    }
    department.name = name;
    try{
        await department.save();
    }catch(err){
        const error = new HttpError('something went wrong!, could not update department',500);
        return next(error)
    }
    res.status(200).json({department:department.toObject({getters:true})});
}

const deleteDept = async(req,res,next)=>{
    const deptId = req.params.did;
    let department;
    try{
        department = await Department.findById(deptId);
        if(!department){
            const error = new HttpError('department not found', 404)
        }
        await department.deleteOne()
    }catch(err){
        const error = new HttpError('could not delete department', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted Department.....'})
}


exports.deleteDept = deleteDept;
exports.updateDept = updateDept;
exports.getDeptById = getDeptById;
exports.getAllDept = getAllDept
exports.createDepartment = createDepartment;