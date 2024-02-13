const express = require("express");
const registerModel = require("../models/Register-model");
const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        const data=req.body;
        const registerData= new registerModel(data)
        const response=await registerData.save()
        res.status(200).json(response)
        console.log("register data is created",response);
       
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" });
    }
})

router.get('/',async(req,res)=>{
    try {
        const data= await registerModel.find()
        console.log("register data is find",data)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})
router.put('/:id',async(req,res)=>{
    try {
        const findData=req.params.id;
        const updateData=req.body
        const response= await registerModel.findByIdAndUpdate(findData,updateData,{
            new:true,
            runValidators:true
        }) 
        if(!response){
            res.status(404).json({error:"RegisterData is not found"})
        }
        console.log("register data is find and update",response);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const deleteData=req.params.id
        const response=await registerModel.findByIdAndDelete(deleteData)
        if(!response){
            res.status(404).json({error:"Register  data not found"})
        }
        console.log("register data is deleted",response);
        res.status(500).json(response)
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
})
module.exports=router;