const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const deptroutes = require('./routes/dept-route');
const emproutes = require('./routes/emp-route');
const HttpError = require('./model/http-error');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use('/api/employee', emproutes);
app.use('/api/dept', deptroutes);

app.use((req,res,next)=>{
    const error = new HttpError('could not find this route', 404);
    throw error;
});

app.use((err,req,res,next)=>{
    if(res.headerSent){
        return next(err)
    }
    res.status(err.code || 500);
    res.json({message: err.message} || 'An unknown error occured');
})

mongoose.connect('mongodb+srv://sahayamisba:Faith@faithcluster.ei6sb.mongodb.net/ems?retryWrites=true&w=majority&appName=Faithcluster')
.then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err);
})